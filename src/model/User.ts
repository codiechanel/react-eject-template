export interface User {
  id: number
  id_str: string
  name: string
  screen_name: string
  location: string
  description: string
  url: null | string
  entities: UserEntities
  protected: boolean
  followers_count: number
  friends_count: number
  listed_count: number
  created_at: string
  favourites_count: number
  utc_offset: null
  time_zone: null
  geo_enabled: boolean
  verified: boolean
  statuses_count: number
  lang: UserLang
  status: Status
  contributors_enabled: boolean
  is_translator: boolean
  is_translation_enabled: boolean
  profile_background_color: string
  profile_background_image_url: string
  profile_background_image_url_https: string
  profile_background_tile: boolean
  profile_image_url: string
  profile_image_url_https: string
  profile_banner_url?: string
  profile_link_color: string
  profile_sidebar_border_color: string
  profile_sidebar_fill_color: string
  profile_text_color: string
  profile_use_background_image: boolean
  has_extended_profile: boolean
  default_profile: boolean
  default_profile_image: boolean
  following: null
  follow_request_sent: null
  notifications: null
  translator_type: TranslatorType
}

export interface UserEntities {
  description: Description
  url?: Description
}

export interface Description {
  urls: URL[]
}

export interface URL {
  url: string
  expanded_url: string
  display_url: string
  indices: number[]
}

export enum UserLang {
  De = "de",
  En = "en"
}

export interface Status {
  created_at: string
  id: number
  id_str: string
  text: string
  truncated: boolean
  entities: StatusEntities
  source: string
  in_reply_to_status_id: number | null
  in_reply_to_status_id_str: null | string
  in_reply_to_user_id: number | null
  in_reply_to_user_id_str: null | string
  in_reply_to_screen_name: null | string
  geo: null
  coordinates: null
  place: Place | null
  contributors: null
  is_quote_status: boolean
  retweet_count: number
  favorite_count: number
  favorited: boolean
  retweeted: boolean
  lang: StatusLang
  possibly_sensitive?: boolean
  extended_entities?: ExtendedEntities
  retweeted_status?: RetweetedStatus
  quoted_status_id?: number
  quoted_status_id_str?: string
}

export interface StatusEntities {
  hashtags: Hashtag[]
  symbols: any[]
  user_mentions: UserMention[]
  urls: URL[]
  media?: Media[]
}

export interface Hashtag {
  text: string
  indices: number[]
}

export interface Media {
  id: number
  id_str: string
  indices: number[]
  media_url: string
  media_url_https: string
  url: string
  display_url: string
  expanded_url: string
  type: string
  sizes: Sizes
  video_info?: VideoInfo
}

export interface Sizes {
  thumb: Large
  medium: Large
  large: Large
  small: Large
}

export interface Large {
  w: number
  h: number
  resize: Resize
}

export enum Resize {
  Crop = "crop",
  Fit = "fit"
}

export interface VideoInfo {
  aspect_ratio: number[]
  variants: Variant[]
}

export interface Variant {
  bitrate: number
  content_type: string
  url: string
}

export interface UserMention {
  screen_name: string
  name: string
  id: number
  id_str: string
  indices: number[]
}

export interface ExtendedEntities {
  media: Media[]
}

export enum StatusLang {
  En = "en",
  Und = "und"
}

export interface Place {
  id: string
  url: string
  place_type: string
  name: string
  full_name: string
  country_code: string
  country: string
  contained_within: any[]
  bounding_box: BoundingBox
  attributes: Attributes
}

export interface Attributes {}

export interface BoundingBox {
  type: string
  coordinates: Array<Array<number[]>>
}

export interface RetweetedStatus {
  created_at: string
  id: number
  id_str: string
  text: string
  truncated: boolean
  entities: StatusEntities
  source: string
  in_reply_to_status_id: null
  in_reply_to_status_id_str: null
  in_reply_to_user_id: null
  in_reply_to_user_id_str: null
  in_reply_to_screen_name: null
  geo: null
  coordinates: null
  place: null
  contributors: null
  is_quote_status: boolean
  retweet_count: number
  favorite_count: number
  favorited: boolean
  retweeted: boolean
  lang: UserLang
  possibly_sensitive?: boolean
  quoted_status_id?: number
  quoted_status_id_str?: string
}

export enum TranslatorType {
  None = "none",
  Regular = "regular"
}
