type VkApiPrimitive = string | number | boolean

type VkApiCallParams = Record<string, VkApiPrimitive | undefined>

type VkUploadServerResponse = {
  upload_url: string
}

type VkUploadPhotoResponse = {
  server: number
  photo: string
  hash: string
}

type VkSavedWallPhoto = {
  id: number
  owner_id: number
}

type VkWallPostResponse = {
  post_id: number
}

export type PostToVkCommunityInput = {
  /**
   * Community token from "Manage -> API -> Access tokens".
   */
  accessToken: string
  /**
   * VK community numeric id without minus sign, e.g. 123456789.
   */
  groupId: number
  /**
   * Main post text.
   */
  message: string
  /**
   * Optional image URL to attach.
   */
  imageUrl?: string
  /**
   * Optional URL to attach to the post.
   */
  linkUrl?: string
  /**
   * VK API version.
   */
  apiVersion?: string
}

export type PostToVkCommunityResult = {
  postId: number
  attachments: string[]
  /**
   * Set when the image was provided but could not be uploaded (e.g. group token
   * cannot use photos.getWallUploadServer). The post is still published as text.
   */
  imageError?: string
}

type VkApiSuccess<T> = {
  response: T
}

type VkApiFailure = {
  error: {
    error_code: number
    error_msg: string
  }
}

type VkApiResult<T> = VkApiSuccess<T> | VkApiFailure

const DEFAULT_VK_API_VERSION = '5.199'
const VK_API_BASE_URL = 'https://api.vk.com/method'

const hasError = <T>(payload: VkApiResult<T>): payload is VkApiFailure =>
  typeof payload === 'object' && payload !== null && 'error' in payload

const toVkSearchParams = (params: VkApiCallParams): URLSearchParams => {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    search.set(key, String(value))
  }

  return search
}

const vkApiCall = async <T>(
  method: string,
  params: VkApiCallParams,
): Promise<T> => {
  const url = `${VK_API_BASE_URL}/${method}`
  const query = toVkSearchParams(params)
  const response = await fetch(`${url}?${query.toString()}`)

  if (!response.ok) {
    throw new Error(`[VK API] ${method} failed with HTTP ${response.status}`)
  }

  const payload = (await response.json()) as VkApiResult<T>

  if (hasError(payload)) {
    throw new Error(`[VK API] ${method} failed: ${payload.error.error_code} ${payload.error.error_msg}`)
  }

  return payload.response
}

const uploadImageToVkWall = async (
  accessToken: string,
  groupId: number,
  imageUrl: string,
  apiVersion: string,
): Promise<string> => {
  const uploadServer = await vkApiCall<VkUploadServerResponse>('photos.getWallUploadServer', {
    access_token: accessToken,
    v: apiVersion,
    group_id: groupId,
  })

  const imageResponse = await fetch(imageUrl)
  if (!imageResponse.ok) {
    throw new Error(`Unable to download image for VK upload: HTTP ${imageResponse.status}`)
  }

  const imageBlob = await imageResponse.blob()
  const imageForm = new FormData()
  imageForm.append('photo', imageBlob, 'image.jpg')

  const uploadResponse = await fetch(uploadServer.upload_url, {
    method: 'POST',
    body: imageForm,
  })

  if (!uploadResponse.ok) {
    throw new Error(`VK upload endpoint failed with HTTP ${uploadResponse.status}`)
  }

  const uploaded = (await uploadResponse.json()) as VkUploadPhotoResponse
  const savedPhotos = await vkApiCall<VkSavedWallPhoto[]>('photos.saveWallPhoto', {
    access_token: accessToken,
    v: apiVersion,
    group_id: groupId,
    server: uploaded.server,
    photo: uploaded.photo,
    hash: uploaded.hash,
  })

  const firstPhoto = Array.isArray(savedPhotos) ? savedPhotos[0] : undefined
  if (!firstPhoto) {
    throw new Error('VK did not return saved wall photo data')
  }

  return `photo${firstPhoto.owner_id}_${firstPhoto.id}`
}

export const postToVkCommunity = async ({
  accessToken,
  groupId,
  message,
  imageUrl,
  linkUrl,
  apiVersion = DEFAULT_VK_API_VERSION,
}: PostToVkCommunityInput): Promise<PostToVkCommunityResult> => {
  if (!accessToken.trim()) throw new Error('VK access token is required')
  if (!groupId || groupId <= 0) throw new Error('VK groupId must be a positive number')
  if (!message.trim()) throw new Error('VK message must not be empty')

  const attachments: string[] = []
  let imageError: string | undefined

  if (imageUrl?.trim()) {
    try {
      const photoAttachment = await uploadImageToVkWall(accessToken, groupId, imageUrl.trim(), apiVersion)
      attachments.push(photoAttachment)
    } catch (error) {
      // Image upload must not block the post itself (e.g. group token can't use
      // photos.getWallUploadServer). Fall back to a text/link-only post.
      imageError = error instanceof Error ? error.message : String(error)
    }
  }

  if (linkUrl?.trim()) {
    attachments.push(linkUrl.trim())
  }

  const post = await vkApiCall<VkWallPostResponse>('wall.post', {
    access_token: accessToken,
    v: apiVersion,
    owner_id: -Math.abs(groupId),
    from_group: 1,
    message: message.trim(),
    attachments: attachments.length ? attachments.join(',') : undefined,
  })

  return {
    postId: post.post_id,
    attachments,
    imageError,
  }
}
