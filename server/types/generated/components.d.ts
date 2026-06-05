import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFormats extends Struct.ComponentSchema {
  collectionName: 'components_shared_formats';
  info: {
    displayName: 'Shared.ServiceCard';
  };
  attributes: {
    advantages: Schema.Attribute.Component<'shared.shared-item', true>;
    audience: Schema.Attribute.String;
    description: Schema.Attribute.String;
    new: Schema.Attribute.Boolean;
    price: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedNav extends Struct.ComponentSchema {
  collectionName: 'components_shared_navs';
  info: {
    displayName: 'Nav';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    src: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedNewsHeadline extends Struct.ComponentSchema {
  collectionName: 'components_shared_news_headlines';
  info: {
    displayName: 'News.Headline';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface SharedNewsParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_news_paragraphs';
  info: {
    displayName: 'News.Paragraph';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
  };
}

export interface SharedQuestion extends Struct.ComponentSchema {
  collectionName: 'components_shared_questions';
  info: {
    displayName: 'Shared.Question';
  };
  attributes: {
    Answer: Schema.Attribute.String;
    Question: Schema.Attribute.String;
  };
}

export interface SharedRentVariant extends Struct.ComponentSchema {
  collectionName: 'components_shared_rent_variants';
  info: {
    displayName: 'Shared.VariantCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Image: Schema.Attribute.Component<'shared.shared-image', false>;
    lines: Schema.Attribute.Component<'shared.shared-item', true>;
    price: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    displayName: 'Section header';
  };
  attributes: {
    Question: Schema.Attribute.Component<'shared.question', true>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedSharedAudience extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_audiences';
  info: {
    displayName: 'Shared.Audience';
  };
  attributes: {
    Subtitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SharedSharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_images';
  info: {
    displayName: 'Shared.Image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    src: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedSharedItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_items';
  info: {
    displayName: 'Shared.Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
    value: Schema.Attribute.Text;
  };
}

export interface SharedSharedLines extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_lines';
  info: {
    displayName: 'Shared.Lines';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    line_1: Schema.Attribute.String;
    line_2: Schema.Attribute.String;
  };
}

export interface SharedSharedList extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_lists';
  info: {
    displayName: 'Shared.List';
  };
  attributes: {
    Items: Schema.Attribute.Component<'shared.shared-item', true>;
  };
}

export interface SharedSharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_videos';
  info: {
    displayName: 'Shared.Video';
  };
  attributes: {
    alt: Schema.Attribute.String;
    src: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedStudioClient extends Struct.ComponentSchema {
  collectionName: 'components_shared_studio_clients';
  info: {
    displayName: 'Studio.Client';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
  };
}

export interface SharedStudioService extends Struct.ComponentSchema {
  collectionName: 'components_shared_studio_services';
  info: {
    displayName: 'Studio.Service';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    Features: Schema.Attribute.JSON;
    List: Schema.Attribute.Component<'shared.shared-item', true>;
    Price: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedTeacher extends Struct.ComponentSchema {
  collectionName: 'components_shared_teachers';
  info: {
    displayName: 'Shared.Teacher';
  };
  attributes: {
    Achievements: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Role: Schema.Attribute.String;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface WidgetsDistributionVariants extends Struct.ComponentSchema {
  collectionName: 'components_widgets_distribution_variants';
  info: {
    displayName: 'Distribution.Variants';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    Variant: Schema.Attribute.Component<'shared.rent-variant', true>;
  };
}

export interface WidgetsFaq extends Struct.ComponentSchema {
  collectionName: 'components_widgets_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    FAQ_H: Schema.Attribute.Component<'shared.section-header', false>;
  };
}

export interface WidgetsFormats extends Struct.ComponentSchema {
  collectionName: 'components_widgets_formats';
  info: {
    displayName: 'Formats';
  };
  attributes: {
    description: Schema.Attribute.String;
    services: Schema.Attribute.Component<'shared.formats', true>;
    title: Schema.Attribute.String;
  };
}

export interface WidgetsHero extends Struct.ComponentSchema {
  collectionName: 'components_widgets_heroes';
  info: {
    displayName: 'Hero';
    icon: 'check';
  };
  attributes: {
    Card: Schema.Attribute.Component<'shared.shared-item', true>;
    Chip: Schema.Attribute.String;
    image: Schema.Attribute.Component<'shared.shared-image', false>;
    Title: Schema.Attribute.Component<'shared.shared-lines', false>;
    video: Schema.Attribute.Component<'shared.shared-video', false>;
  };
}

export interface WidgetsMain extends Struct.ComponentSchema {
  collectionName: 'components_widgets_mains';
  info: {
    displayName: 'Main';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'shared.shared-item', true>;
    description: Schema.Attribute.String;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    paragraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface WidgetsNavigation extends Struct.ComponentSchema {
  collectionName: 'components_widgets_navigations';
  info: {
    displayName: 'Navigation';
  };
  attributes: {
    Navigation: Schema.Attribute.Component<'shared.nav', true>;
    src: Schema.Attribute.String;
    Subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface WidgetsRentVariants extends Struct.ComponentSchema {
  collectionName: 'components_widgets_rent_variants';
  info: {
    displayName: 'Rent.Variants';
  };
  attributes: {
    Variant: Schema.Attribute.Component<'shared.rent-variant', true>;
  };
}

export interface WidgetsStudioAudience extends Struct.ComponentSchema {
  collectionName: 'components_widgets_studio_audiences';
  info: {
    displayName: 'Studio.Audience';
  };
  attributes: {
    Items: Schema.Attribute.Component<'shared.shared-audience', true>;
    Title: Schema.Attribute.Component<'shared.shared-audience', false>;
  };
}

export interface WidgetsStudioClients extends Struct.ComponentSchema {
  collectionName: 'components_widgets_studio_clients';
  info: {
    displayName: 'Studio.Clients';
  };
  attributes: {
    Client: Schema.Attribute.Component<'shared.studio-client', true>;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface WidgetsStudioServices extends Struct.ComponentSchema {
  collectionName: 'components_widgets_studio_services';
  info: {
    displayName: 'Studio.Services';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Service: Schema.Attribute.Component<'shared.studio-service', true>;
    Title: Schema.Attribute.String;
  };
}

export interface WidgetsTeachers extends Struct.ComponentSchema {
  collectionName: 'components_widgets_teachers';
  info: {
    displayName: 'Teachers';
  };
  attributes: {
    Subtitle: Schema.Attribute.String;
    Teacher: Schema.Attribute.Component<'shared.teacher', true>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.formats': SharedFormats;
      'shared.nav': SharedNav;
      'shared.news-headline': SharedNewsHeadline;
      'shared.news-paragraph': SharedNewsParagraph;
      'shared.question': SharedQuestion;
      'shared.rent-variant': SharedRentVariant;
      'shared.section-header': SharedSectionHeader;
      'shared.shared-audience': SharedSharedAudience;
      'shared.shared-image': SharedSharedImage;
      'shared.shared-item': SharedSharedItem;
      'shared.shared-lines': SharedSharedLines;
      'shared.shared-list': SharedSharedList;
      'shared.shared-video': SharedSharedVideo;
      'shared.studio-client': SharedStudioClient;
      'shared.studio-service': SharedStudioService;
      'shared.teacher': SharedTeacher;
      'widgets.distribution-variants': WidgetsDistributionVariants;
      'widgets.faq': WidgetsFaq;
      'widgets.formats': WidgetsFormats;
      'widgets.hero': WidgetsHero;
      'widgets.main': WidgetsMain;
      'widgets.navigation': WidgetsNavigation;
      'widgets.rent-variants': WidgetsRentVariants;
      'widgets.studio-audience': WidgetsStudioAudience;
      'widgets.studio-clients': WidgetsStudioClients;
      'widgets.studio-services': WidgetsStudioServices;
      'widgets.teachers': WidgetsTeachers;
    }
  }
}
