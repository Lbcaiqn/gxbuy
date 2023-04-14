export interface bannerListType {
  id: string,
  imgUrl: string
};

export interface todayMessageType {
  title: string,
  news: {
    id: string,
    type: string,
    text: string
  }[],
  tags: {
    id: string,
    text: string,
  }[],
  imgUrl: string
};

export interface recommendType {
  title: string,
  imgUrl: string,
  items: {
    id: string,
    imgUrl: string
  }[]
};

export interface rankType {
  id: string,
  type: string,
  items: {
    id: string,
    text: string,
    price: string,
    imgUrl: string
  }[]
};

export interface likeType {
  title: string,
  items: {
    id: string,
    text: string,
    price: string,
    imgUrl: string
  }[]
};

export interface floorType {
  id: string,
  name: string,
  keywords: string[],
  imgUrl: string,
  navList: {
    url: string,
    text: string
  }[],
  carouselList: {
    id: string,
    imgUrl: string
  }[],
  recommendList: string[],
  bigImg: string
};

export interface brandType {
  id: string,
  imgUrl: string
}

export type HomeDataType = Partial<{
  bannerList: bannerListType[],
  todayMessage: todayMessageType,
  recommend: recommendType,
  rank: rankType[],
  like: likeType,
  floor: floorType[],
  brand: brandType[]
}>;