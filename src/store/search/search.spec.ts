import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import searchApi from '/~/api/spotify/search'
import actions from './actions'
import mutations, { MutationTypes } from './mutations'
import { State } from './index'

const albumsData = {
  href: 'https://api.spotify.com/v1/search?query=jay&type=album&market=TW&offset=0&limit=20',
  items: [
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/7L8PtRIVYuqIeR9kXwmTek',
      },
      href: 'https://api.spotify.com/v1/albums/7L8PtRIVYuqIeR9kXwmTek',
      id: '7L8PtRIVYuqIeR9kXwmTek',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2732625625847482492f9e2e665',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e022625625847482492f9e2e665',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048512625625847482492f9e2e665',
          width: 64,
        },
      ],
      name: '11月的蕭邦',
      release_date: '2005-11-01',
      release_date_precision: 'day',
      total_tracks: 12,
      type: 'album',
      uri: 'spotify:album:7L8PtRIVYuqIeR9kXwmTek',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/7Gccj3tJAmTV5o2LsDNmwf',
      },
      href: 'https://api.spotify.com/v1/albums/7Gccj3tJAmTV5o2LsDNmwf',
      id: '7Gccj3tJAmTV5o2LsDNmwf',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2734a259ca5a6f986feb1fff695',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e024a259ca5a6f986feb1fff695',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048514a259ca5a6f986feb1fff695',
          width: 64,
        },
      ],
      name: '同名專輯',
      release_date: '2000-11-06',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:7Gccj3tJAmTV5o2LsDNmwf',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/6H93wOohK6r1MwGh41Z4Nb',
          },
          href: 'https://api.spotify.com/v1/artists/6H93wOohK6r1MwGh41Z4Nb',
          id: '6H93wOohK6r1MwGh41Z4Nb',
          name: 'Ashin Chen',
          type: 'artist',
          uri: 'spotify:artist:6H93wOohK6r1MwGh41Z4Nb',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/7iCi34kBpXKyBcx03AXXDw',
      },
      href: 'https://api.spotify.com/v1/albums/7iCi34kBpXKyBcx03AXXDw',
      id: '7iCi34kBpXKyBcx03AXXDw',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2736e692d2c10152772c053a0cc',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e026e692d2c10152772c053a0cc',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048516e692d2c10152772c053a0cc',
          width: 64,
        },
      ],
      name: '說好不哭',
      release_date: '2019-09-17',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:7iCi34kBpXKyBcx03AXXDw',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/2Fqnupm2XuhY25Wa3yjnvY',
      },
      href: 'https://api.spotify.com/v1/albums/2Fqnupm2XuhY25Wa3yjnvY',
      id: '2Fqnupm2XuhY25Wa3yjnvY',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27366d1a374224122c5c5ed5cd9',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0266d1a374224122c5c5ed5cd9',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485166d1a374224122c5c5ed5cd9',
          width: 64,
        },
      ],
      name: '范特西',
      release_date: '2001-09-14',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:2Fqnupm2XuhY25Wa3yjnvY',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/39PHyEjzFKafPr9EM7vQVk',
      },
      href: 'https://api.spotify.com/v1/albums/39PHyEjzFKafPr9EM7vQVk',
      id: '39PHyEjzFKafPr9EM7vQVk',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27322fe29cadcb2a28c2d3b9bb7',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0222fe29cadcb2a28c2d3b9bb7',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485122fe29cadcb2a28c2d3b9bb7',
          width: 64,
        },
      ],
      name: '我很忙',
      release_date: '2007-11-02',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:39PHyEjzFKafPr9EM7vQVk',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/2RdWEfazJrGTiIA1x97y1v',
      },
      href: 'https://api.spotify.com/v1/albums/2RdWEfazJrGTiIA1x97y1v',
      id: '2RdWEfazJrGTiIA1x97y1v',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2736850b3307853e0753ed53cc5',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e026850b3307853e0753ed53cc5',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048516850b3307853e0753ed53cc5',
          width: 64,
        },
      ],
      name: '葉惠美',
      release_date: '2003-07-29',
      release_date_precision: 'day',
      total_tracks: 11,
      type: 'album',
      uri: 'spotify:album:2RdWEfazJrGTiIA1x97y1v',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/7vSaodFzUYCexkKXeEhkpc',
      },
      href: 'https://api.spotify.com/v1/albums/7vSaodFzUYCexkKXeEhkpc',
      id: '7vSaodFzUYCexkKXeEhkpc',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27300b976d1df4243e5318a7712',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0200b976d1df4243e5318a7712',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485100b976d1df4243e5318a7712',
          width: 64,
        },
      ],
      name: '七里香',
      release_date: '2004-08-03',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:7vSaodFzUYCexkKXeEhkpc',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/0ByfRfYXHHhGjsXEabfDmf',
      },
      href: 'https://api.spotify.com/v1/albums/0ByfRfYXHHhGjsXEabfDmf',
      id: '0ByfRfYXHHhGjsXEabfDmf',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273db1172ca038c6818b6ae8bf2',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02db1172ca038c6818b6ae8bf2',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851db1172ca038c6818b6ae8bf2',
          width: 64,
        },
      ],
      name: '周杰倫的床邊故事',
      release_date: '2016-06-24',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:0ByfRfYXHHhGjsXEabfDmf',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/2SrwWoOk7egNTcaJcb4tuO',
      },
      href: 'https://api.spotify.com/v1/albums/2SrwWoOk7egNTcaJcb4tuO',
      id: '2SrwWoOk7egNTcaJcb4tuO',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273c2321adb9887902f0c5bd8f1',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02c2321adb9887902f0c5bd8f1',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851c2321adb9887902f0c5bd8f1',
          width: 64,
        },
      ],
      name: '魔杰座',
      release_date: '2008-10-15',
      release_date_precision: 'day',
      total_tracks: 11,
      type: 'album',
      uri: 'spotify:album:2SrwWoOk7egNTcaJcb4tuO',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/6D7H9eUkaMPJ1M3p6ioljZ',
      },
      href: 'https://api.spotify.com/v1/albums/6D7H9eUkaMPJ1M3p6ioljZ',
      id: '6D7H9eUkaMPJ1M3p6ioljZ',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27315154feeb27e2ae74a720993',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0215154feeb27e2ae74a720993',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485115154feeb27e2ae74a720993',
          width: 64,
        },
      ],
      name: '依然范特西',
      release_date: '2006-09-05',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:6D7H9eUkaMPJ1M3p6ioljZ',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/73TuSaNd471d1A8k5sqax1',
      },
      href: 'https://api.spotify.com/v1/albums/73TuSaNd471d1A8k5sqax1',
      id: '73TuSaNd471d1A8k5sqax1',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27383a404faeaf8330b674801ea',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0283a404faeaf8330b674801ea',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485183a404faeaf8330b674801ea',
          width: 64,
        },
      ],
      name: '八度空間',
      release_date: '2002-07-18',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:73TuSaNd471d1A8k5sqax1',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/1TN7aPDawSKY2yJgGRuBtD',
      },
      href: 'https://api.spotify.com/v1/albums/1TN7aPDawSKY2yJgGRuBtD',
      id: '1TN7aPDawSKY2yJgGRuBtD',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273f595d6f04a4c8b07d0db2db4',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02f595d6f04a4c8b07d0db2db4',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851f595d6f04a4c8b07d0db2db4',
          width: 64,
        },
      ],
      name: '哎呦, 不錯哦',
      release_date: '2014-12-26',
      release_date_precision: 'day',
      total_tracks: 12,
      type: 'album',
      uri: 'spotify:album:1TN7aPDawSKY2yJgGRuBtD',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/4XDi67ZENZcbfKnvMnTYsI',
          },
          href: 'https://api.spotify.com/v1/artists/4XDi67ZENZcbfKnvMnTYsI',
          id: '4XDi67ZENZcbfKnvMnTYsI',
          name: 'Jay Park',
          type: 'artist',
          uri: 'spotify:artist:4XDi67ZENZcbfKnvMnTYsI',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/0c4LKBzh0ufU36AyuzZRc2',
      },
      href: 'https://api.spotify.com/v1/albums/0c4LKBzh0ufU36AyuzZRc2',
      id: '0c4LKBzh0ufU36AyuzZRc2',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27382ecc5ea89bf34479a71a297',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0282ecc5ea89bf34479a71a297',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485182ecc5ea89bf34479a71a297',
          width: 64,
        },
      ],
      name: 'EVERYTHING YOU WANTED',
      release_date: '2016-10-20',
      release_date_precision: 'day',
      total_tracks: 19,
      type: 'album',
      uri: 'spotify:album:0c4LKBzh0ufU36AyuzZRc2',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/7oz7WhrdSfsC3GkAUPOzgL',
      },
      href: 'https://api.spotify.com/v1/albums/7oz7WhrdSfsC3GkAUPOzgL',
      id: '7oz7WhrdSfsC3GkAUPOzgL',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273fbd3239d75fec45d37bbf079',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02fbd3239d75fec45d37bbf079',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851fbd3239d75fec45d37bbf079',
          width: 64,
        },
      ],
      name: '跨時代',
      release_date: '2010-05-18',
      release_date_precision: 'day',
      total_tracks: 11,
      type: 'album',
      uri: 'spotify:album:7oz7WhrdSfsC3GkAUPOzgL',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/3IjHX8KZKoeq3X4QgXxqbT',
          },
          href: 'https://api.spotify.com/v1/artists/3IjHX8KZKoeq3X4QgXxqbT',
          id: '3IjHX8KZKoeq3X4QgXxqbT',
          name: 'JAY B',
          type: 'artist',
          uri: 'spotify:artist:3IjHX8KZKoeq3X4QgXxqbT',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/5mFDH66iKlo3pBjMSRxddK',
      },
      href: 'https://api.spotify.com/v1/albums/5mFDH66iKlo3pBjMSRxddK',
      id: '5mFDH66iKlo3pBjMSRxddK',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273bfe9fe789231d91f824357a1',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02bfe9fe789231d91f824357a1',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851bfe9fe789231d91f824357a1',
          width: 64,
        },
      ],
      name: 'Switch It Up (feat. sokodomo) [Prod. Cha Cha Malone]',
      release_date: '2021-05-14',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:5mFDH66iKlo3pBjMSRxddK',
    },
    {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/5Ld4kLIL16CwUAx7IbxtIQ',
      },
      href: 'https://api.spotify.com/v1/albums/5Ld4kLIL16CwUAx7IbxtIQ',
      id: '5Ld4kLIL16CwUAx7IbxtIQ',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2732e8a09abf9a40b7e2537900b',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e022e8a09abf9a40b7e2537900b',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048512e8a09abf9a40b7e2537900b',
          width: 64,
        },
      ],
      name: '十二新作',
      release_date: '2012-12-28',
      release_date_precision: 'day',
      total_tracks: 12,
      type: 'album',
      uri: 'spotify:album:5Ld4kLIL16CwUAx7IbxtIQ',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/1xqkT06p85DIZeqrlVGVWv',
          },
          href: 'https://api.spotify.com/v1/artists/1xqkT06p85DIZeqrlVGVWv',
          id: '1xqkT06p85DIZeqrlVGVWv',
          name: 'Jayesslee',
          type: 'artist',
          uri: 'spotify:artist:1xqkT06p85DIZeqrlVGVWv',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/0LSxgMrHqhG4l9zLUUW1Hs',
      },
      href: 'https://api.spotify.com/v1/albums/0LSxgMrHqhG4l9zLUUW1Hs',
      id: '0LSxgMrHqhG4l9zLUUW1Hs',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27395d764def68bc8500e25a81f',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0295d764def68bc8500e25a81f',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485195d764def68bc8500e25a81f',
          width: 64,
        },
      ],
      name: 'Jayesslee Studio Sessions',
      release_date: '2012-12-10',
      release_date_precision: 'day',
      total_tracks: 4,
      type: 'album',
      uri: 'spotify:album:0LSxgMrHqhG4l9zLUUW1Hs',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/1RDzEskhUbajEbNp9xeglp',
      },
      href: 'https://api.spotify.com/v1/albums/1RDzEskhUbajEbNp9xeglp',
      id: '1RDzEskhUbajEbNp9xeglp',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2733735291acfa45f546990cf51',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e023735291acfa45f546990cf51',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048513735291acfa45f546990cf51',
          width: 64,
        },
      ],
      name: 'Mojito',
      release_date: '2020-06-12',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:1RDzEskhUbajEbNp9xeglp',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/07OePkse2fcvU9wlVftNMl',
          },
          href: 'https://api.spotify.com/v1/artists/07OePkse2fcvU9wlVftNMl',
          id: '07OePkse2fcvU9wlVftNMl',
          name: 'SE SO NEON',
          type: 'artist',
          uri: 'spotify:artist:07OePkse2fcvU9wlVftNMl',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/2ikSIntGYyG6biNQC0UgnH',
      },
      href: 'https://api.spotify.com/v1/albums/2ikSIntGYyG6biNQC0UgnH',
      id: '2ikSIntGYyG6biNQC0UgnH',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b27316adbe82a3161d9360b76981',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e0216adbe82a3161d9360b76981',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d0000485116adbe82a3161d9360b76981',
          width: 64,
        },
      ],
      name: 'Jayu 자유',
      release_date: '2021-02-05',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:2ikSIntGYyG6biNQC0UgnH',
    },
    {
      album_type: 'single',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
          },
          href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
          id: '2elBjNSdBE2Y3f0j1mjrql',
          name: '周杰倫',
          type: 'artist',
          uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
        },
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/4a4AczO0gVcMkAoqFXxPLA',
      },
      href: 'https://api.spotify.com/v1/albums/4a4AczO0gVcMkAoqFXxPLA',
      id: '4a4AczO0gVcMkAoqFXxPLA',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273a51c803d8ef69c3b7f8208e9',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02a51c803d8ef69c3b7f8208e9',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851a51c803d8ef69c3b7f8208e9',
          width: 64,
        },
      ],
      name: '《不能說的秘密》電影原聲帶',
      release_date: '2007-08-13',
      release_date_precision: 'day',
      total_tracks: 25,
      type: 'album',
      uri: 'spotify:album:4a4AczO0gVcMkAoqFXxPLA',
    },
  ],
  limit: 20,
  next: 'https://api.spotify.com/v1/search?query=jay&type=album&market=TW&offset=20&limit=20',
  offset: 0,
  previous: null,
  total: 20008,
}

const artistsData = {
  href: 'https://api.spotify.com/v1/search?query=jay&type=artist&market=TW&offset=0&limit=1',
  items: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql',
      },
      followers: {
        href: null,
        total: 2412285,
      },
      genres: [
        'c-pop',
        'mandopop',
        'taiwan pop',
        'zhongguo feng',
      ],
      href: 'https://api.spotify.com/v1/artists/2elBjNSdBE2Y3f0j1mjrql',
      id: '2elBjNSdBE2Y3f0j1mjrql',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/0e5952203ea0140aa5687fccee5a7fa1d61bb3d6',
          width: 640,
        },
        {
          height: 320,
          url: 'https://i.scdn.co/image/a7ad7c524120d2ebe4f9779ac13368d9de54ae8a',
          width: 320,
        },
        {
          height: 160,
          url: 'https://i.scdn.co/image/fddd91e321968bca0f6bc43d89418661af2c79d6',
          width: 160,
        },
      ],
      name: '周杰倫',
      popularity: 74,
      type: 'artist',
      uri: 'spotify:artist:2elBjNSdBE2Y3f0j1mjrql',
    },
  ],
  limit: 1,
  next: 'https://api.spotify.com/v1/search?query=jay&type=artist&market=TW&offset=1&limit=1',
  offset: 0,
  previous: null,
  total: 37255,
}

const playlistsData = {
  href: 'https://api.spotify.com/v1/search?query=play&type=playlist&offset=0&limit=1',
  items: [
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/4H9rX207AFNAYIW9Wx7lPT',
      },
      href: 'https://api.spotify.com/v1/playlists/4H9rX207AFNAYIW9Wx7lPT',
      id: '4H9rX207AFNAYIW9Wx7lPT',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b273318ec02a3a8fa4f52fa44fecab67616d0000b273c9f237fbcd598b58fd6d9878ab67616d0000b273cc998ec40008da7d13060263ab67616d0000b273f3c62f90ed9ed786fde1bacc',
          width: 640,
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b273318ec02a3a8fa4f52fa44fecab67616d0000b273c9f237fbcd598b58fd6d9878ab67616d0000b273cc998ec40008da7d13060263ab67616d0000b273f3c62f90ed9ed786fde1bacc',
          width: 300,
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b273318ec02a3a8fa4f52fa44fecab67616d0000b273c9f237fbcd598b58fd6d9878ab67616d0000b273cc998ec40008da7d13060263ab67616d0000b273f3c62f90ed9ed786fde1bacc',
          width: 60,
        },
      ],
      name: 'Playlist🍃',
      owner: {
        display_name: 'Jasminee',
        external_urls: {
          spotify: 'https://open.spotify.com/user/nk8uj3htc112n4mtfgqnezad5',
        },
        href: 'https://api.spotify.com/v1/users/nk8uj3htc112n4mtfgqnezad5',
        id: 'nk8uj3htc112n4mtfgqnezad5',
        type: 'user',
        uri: 'spotify:user:nk8uj3htc112n4mtfgqnezad5',
      },
      primary_color: null,
      public: null,
      snapshot_id: 'MjA2OSw3MGI2NjRhNDRjYTEzNjJiOTU0ZWQ4YWZkMWU0YWU4MzQ2YWNkYmM5',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/4H9rX207AFNAYIW9Wx7lPT/tracks',
        total: 508,
      },
      type: 'playlist',
      uri: 'spotify:playlist:4H9rX207AFNAYIW9Wx7lPT',
    },
  ],
  limit: 1,
  next: 'https://api.spotify.com/v1/search?query=play&type=playlist&offset=1&limit=1',
  offset: 0,
  previous: null,
  total: 2500001,
}

const tracksData = {
  href: 'https://api.spotify.com/v1/search?query=play&type=track&offset=0&limit=1',
  items: [
    {
      album: {
        album_type: 'single',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
            },
            href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
            id: '41MozSoPIsD1dJM0CLPjZF',
            name: 'BLACKPINK',
            type: 'artist',
            uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF',
          },
        ],
        available_markets: [
          'AD',
          'AE',
          'AG',
          'AL',
          'AM',
          'AO',
          'AR',
          'AT',
          'AU',
          'AZ',
          'BA',
          'BB',
          'BD',
          'BE',
          'BF',
          'BG',
          'BH',
          'BI',
          'BJ',
          'BN',
          'BO',
          'BR',
          'BS',
          'BT',
          'BW',
          'BY',
          'BZ',
          'CA',
          'CH',
          'CI',
          'CL',
          'CM',
          'CO',
          'CR',
          'CV',
          'CW',
          'CY',
          'CZ',
          'DE',
          'DJ',
          'DK',
          'DM',
          'DO',
          'DZ',
          'EC',
          'EE',
          'EG',
          'ES',
          'FI',
          'FJ',
          'FM',
          'FR',
          'GA',
          'GB',
          'GD',
          'GE',
          'GH',
          'GM',
          'GN',
          'GQ',
          'GR',
          'GT',
          'GW',
          'GY',
          'HK',
          'HN',
          'HR',
          'HT',
          'HU',
          'ID',
          'IE',
          'IL',
          'IN',
          'IS',
          'IT',
          'JM',
          'JO',
          'KE',
          'KG',
          'KH',
          'KI',
          'KM',
          'KN',
          'KR',
          'KW',
          'KZ',
          'LA',
          'LB',
          'LC',
          'LI',
          'LK',
          'LR',
          'LS',
          'LT',
          'LU',
          'LV',
          'MA',
          'MC',
          'MD',
          'ME',
          'MG',
          'MH',
          'MK',
          'ML',
          'MN',
          'MO',
          'MR',
          'MT',
          'MU',
          'MV',
          'MW',
          'MX',
          'MY',
          'MZ',
          'NA',
          'NE',
          'NG',
          'NI',
          'NL',
          'NO',
          'NP',
          'NR',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PG',
          'PH',
          'PK',
          'PL',
          'PS',
          'PT',
          'PW',
          'PY',
          'QA',
          'RO',
          'RS',
          'RU',
          'RW',
          'SA',
          'SB',
          'SC',
          'SE',
          'SG',
          'SI',
          'SK',
          'SL',
          'SM',
          'SN',
          'SR',
          'ST',
          'SV',
          'SZ',
          'TD',
          'TG',
          'TH',
          'TL',
          'TN',
          'TO',
          'TR',
          'TT',
          'TV',
          'TW',
          'TZ',
          'UA',
          'UG',
          'US',
          'UY',
          'UZ',
          'VC',
          'VN',
          'VU',
          'WS',
          'XK',
          'ZA',
          'ZM',
          'ZW',
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/2Fna4Tb7fme5aHsNMJtVtp',
        },
        href: 'https://api.spotify.com/v1/albums/2Fna4Tb7fme5aHsNMJtVtp',
        id: '2Fna4Tb7fme5aHsNMJtVtp',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b27318a4a215052e9f396864bd73',
            width: 640,
          },
          {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e0218a4a215052e9f396864bd73',
            width: 300,
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d0000485118a4a215052e9f396864bd73',
            width: 64,
          },
        ],
        name: 'SQUARE TWO',
        release_date: '2016-11-01',
        release_date_precision: 'day',
        total_tracks: 3,
        type: 'album',
        uri: 'spotify:album:2Fna4Tb7fme5aHsNMJtVtp',
      },
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
          },
          href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
          id: '41MozSoPIsD1dJM0CLPjZF',
          name: 'BLACKPINK',
          type: 'artist',
          uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF',
        },
      ],
      available_markets: [
        'AD',
        'AE',
        'AG',
        'AL',
        'AM',
        'AO',
        'AR',
        'AT',
        'AU',
        'AZ',
        'BA',
        'BB',
        'BD',
        'BE',
        'BF',
        'BG',
        'BH',
        'BI',
        'BJ',
        'BN',
        'BO',
        'BR',
        'BS',
        'BT',
        'BW',
        'BY',
        'BZ',
        'CA',
        'CH',
        'CI',
        'CL',
        'CM',
        'CO',
        'CR',
        'CV',
        'CW',
        'CY',
        'CZ',
        'DE',
        'DJ',
        'DK',
        'DM',
        'DO',
        'DZ',
        'EC',
        'EE',
        'EG',
        'ES',
        'FI',
        'FJ',
        'FM',
        'FR',
        'GA',
        'GB',
        'GD',
        'GE',
        'GH',
        'GM',
        'GN',
        'GQ',
        'GR',
        'GT',
        'GW',
        'GY',
        'HK',
        'HN',
        'HR',
        'HT',
        'HU',
        'ID',
        'IE',
        'IL',
        'IN',
        'IS',
        'IT',
        'JM',
        'JO',
        'KE',
        'KG',
        'KH',
        'KI',
        'KM',
        'KN',
        'KR',
        'KW',
        'KZ',
        'LA',
        'LB',
        'LC',
        'LI',
        'LK',
        'LR',
        'LS',
        'LT',
        'LU',
        'LV',
        'MA',
        'MC',
        'MD',
        'ME',
        'MG',
        'MH',
        'MK',
        'ML',
        'MN',
        'MO',
        'MR',
        'MT',
        'MU',
        'MV',
        'MW',
        'MX',
        'MY',
        'MZ',
        'NA',
        'NE',
        'NG',
        'NI',
        'NL',
        'NO',
        'NP',
        'NR',
        'NZ',
        'OM',
        'PA',
        'PE',
        'PG',
        'PH',
        'PK',
        'PL',
        'PS',
        'PT',
        'PW',
        'PY',
        'QA',
        'RO',
        'RS',
        'RU',
        'RW',
        'SA',
        'SB',
        'SC',
        'SE',
        'SG',
        'SI',
        'SK',
        'SL',
        'SM',
        'SN',
        'SR',
        'ST',
        'SV',
        'SZ',
        'TD',
        'TG',
        'TH',
        'TL',
        'TN',
        'TO',
        'TR',
        'TT',
        'TV',
        'TW',
        'TZ',
        'UA',
        'UG',
        'US',
        'UY',
        'UZ',
        'VC',
        'VN',
        'VU',
        'WS',
        'XK',
        'ZA',
        'ZM',
        'ZW',
      ],
      disc_number: 1,
      duration_ms: 197288,
      explicit: false,
      external_ids: {
        isrc: 'KRA401600236',
      },
      external_urls: {
        spotify: 'https://open.spotify.com/track/7qmvLmX9tyaTiBAVNI6YEn',
      },
      href: 'https://api.spotify.com/v1/tracks/7qmvLmX9tyaTiBAVNI6YEn',
      id: '7qmvLmX9tyaTiBAVNI6YEn',
      is_local: false,
      name: 'PLAYING WITH FIRE',
      popularity: 73,
      preview_url: 'https://p.scdn.co/mp3-preview/993e571d2b43ebf2e65bdfda2b23f8cb4f4d6400?cid=c6d070e5bede432fa77aaeef3b0dc84f',
      track_number: 1,
      type: 'track',
      uri: 'spotify:track:7qmvLmX9tyaTiBAVNI6YEn',
    },
  ],
  limit: 1,
  next: 'https://api.spotify.com/v1/search?query=play&type=track&offset=1&limit=1',
  offset: 0,
  previous: null,
  total: 250002,
}

const searchResult = {
  albums: albumsData,
  artists: artistsData,
  tracks: tracksData,
  playlists: playlistsData,
}

describe('search module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      getters: {
        getPlaylists: () => {
          return {
            limit: 100,
            offset: 0,
            total: 200,
          }
        },
      },
      state: {
        albums: {
          next: 'xxxx',
        },
        artists: {
          next: 'xxxxx',
        },
        playlists: {
          next: 'xxxxx',
        },
        tracks: {
          next: 'xxxxx',
        },
        query: '',
      },
    } as ActionContext<State, RootState>
  })

  it('search actions: SET_SEARCH_QUERY', () => {
    actions.SET_SEARCH_QUERY(testContext, 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_SEARCH_QUERY', 'abcde')
  })

  it('search actions: REQUEST_SEARCH', () => {
    actions.REQUEST_SEARCH(testContext)
    expect(testContext.commit).toHaveBeenCalled()
  })

  it('search actions: REQUEST_SEARCH_SUCCESS', () => {
    const data = {
      artists: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      tracks: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      playlists: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      albums: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
    }
    actions.REQUEST_SEARCH_SUCCESS(testContext, data)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_SEARCH_SUCCESS', data)
  })

  it('search actions: REQUEST_SEARCH_ERROR', () => {
    const error = {
      status: 400,
      message: 'invalid id',
    }
    actions.REQUEST_SEARCH_ERROR(testContext, error)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_SEARCH_ERROR', error)
  })

  it('search actions: SEARCH succeed', async() => {
    const data = {
      artists: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      tracks: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      playlists: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
      albums: {
        next: 'xxxxx',
        limit: 20,
        offset: 0,
        items: [],
      },
    }
    searchApi.search = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data,
    }))
    await actions.SEARCH(testContext, 'abcde')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_SEARCH')
    expect(testContext.dispatch).toHaveBeenCalledWith('SET_SEARCH_QUERY', 'abcde')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_SEARCH_SUCCESS', data)
  })

  it('search actions: SEARCH error', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => { throw new Error('error') })
    await actions.SEARCH(testContext, 'abcde')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_SEARCH')
    expect(testContext.dispatch).toHaveBeenCalledWith('SET_SEARCH_QUERY', 'abcde')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_SEARCH_ERROR', Error('error'))
  })

  it('search actions: REQUEST_GET_ALBUMS', () => {
    actions.REQUEST_GET_ALBUMS(testContext)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ALBUMS')
  })

  it('search actions: REQUEST_GET_ALBUMS_SUCCESS', () => {
    actions.REQUEST_GET_ALBUMS_SUCCESS(testContext, albumsData)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ALBUMS_SUCCESS', albumsData)
  })

  it('search actions: REQUEST_GET_ALBUMS_ERROR', () => {
    const error = {
      status: 400,
      message: 'invalid id',
    }
    actions.REQUEST_GET_ALBUMS_ERROR(testContext, error)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ALBUMS_ERROR', error)
  })

  it('search actions: GET_ALBUMS succeed', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: albumsData,
    }))
    await actions.GET_ALBUMS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ALBUMS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ALBUMS_SUCCESS', albumsData)
  })

  it('search actions: GET_ALBUMS error', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => { throw new Error('error') })
    await actions.GET_ALBUMS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ALBUMS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ALBUMS_ERROR')
  })

  it('search actions: REQUEST_GET_ARTISTS', () => {
    actions.REQUEST_GET_ARTISTS(testContext)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ARTISTS')
  })

  it('search actions: REQUEST_GET_ARTISTS_SUCCESS', () => {
    actions.REQUEST_GET_ARTISTS_SUCCESS(testContext, artistsData)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ARTISTS_SUCCESS', artistsData)
  })

  it('search actions: REQUEST_GET_ARTISTS_ERROR', () => {
    const error = {
      status: 400,
      message: 'invalid id',
    }
    actions.REQUEST_GET_ARTISTS_ERROR(testContext, error)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_ARTISTS_ERROR', error)
  })

  it('search actions: GET_ARTISTS succeed', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: artistsData,
    }))
    await actions.GET_ARTISTS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ARTISTS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ARTISTS_SUCCESS', artistsData)
  })

  it('search actions: GET_ARTISTS error', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => { throw new Error('error') })
    await actions.GET_ARTISTS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_ARTISTS')
    expect(testContext.dispatch).toHaveBeenLastCalledWith('REQUEST_GET_ARTISTS_ERROR', new Error('error'))
  })

  it('search actions: REQUEST_GET_PLAYLISTS', () => {
    actions.REQUEST_GET_PLAYLISTS(testContext)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS')
  })

  it('search actions: REQUEST_GET_PLAYLISTS_SUCCESS', () => {
    actions.REQUEST_GET_PLAYLISTS_SUCCESS(testContext, playlistsData)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS_SUCCESS', playlistsData)
  })

  it('search actions: REQUEST_GET_PLAYLISTS_ERROR', () => {
    const error = {
      status: 400,
      message: 'invalid id',
    }
    actions.REQUEST_GET_PLAYLISTS_ERROR(testContext, error)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS_ERROR', error)
  })

  it('search actions: GET_PLAYLISTS succeed', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: playlistsData,
    }))
    await actions.GET_PLAYLISTS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS')
  })

  it('search actions: GET_PLAYLISTS error', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => { throw new Error('error') })
    await actions.GET_PLAYLISTS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_PLAYLISTS_ERROR', new Error('error'))
  })

  it('search actions: REQUEST_GET_TRACKS', () => {
    actions.REQUEST_GET_TRACKS(testContext)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_TRACKS')
  })

  it('search actions: REQUEST_GET_TRACKS_SUCCESS', () => {
    actions.REQUEST_GET_TRACKS_SUCCESS(testContext, tracksData)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_TRACKS_SUCCESS', tracksData)
  })

  it('search actions: REQUEST_GET_TRACKS_ERROR', () => {
    const error = {
      status: 400,
      message: 'invalid id',
    }
    actions.REQUEST_GET_TRACKS_ERROR(testContext, error)
    expect(testContext.commit).toHaveBeenCalledWith('REQUEST_GET_TRACKS_ERROR', error)
  })

  it('search actions: GET_TRACKS succeed', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: tracksData,
    }))
    await actions.GET_TRACKS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_TRACKS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_TRACKS_SUCCESS', tracksData)
  })

  it('search actions: GET_TRACKS error', async() => {
    searchApi.search = jest.fn().mockImplementationOnce(() => { throw new Error('error') })
    await actions.GET_TRACKS(testContext)
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_TRACKS')
    expect(testContext.dispatch).toHaveBeenCalledWith('REQUEST_GET_TRACKS_ERROR', new Error('error'))
  })

  it('search mutations', () => {
    const state = {
      query: '',
      result: {
        albums: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        artists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        playlists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        tracks: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
      },
      isLoading: false,
      error: null,
      albums: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      albumsIsLoading: false,
      albumsError: null,
      artists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      artistsIsLoading: false,
      artistsError: null,
      playlists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      playlistsIsLoading: false,
      playlistsError: null,
      tracks: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      tracksIsLoading: false,
      tracksError: null,
    }

    mutations.SET_SEARCH_QUERY(state, 'abcde')
    expect(state).toEqual({
      query: 'abcde',
      result: {
        albums: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        artists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        playlists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        tracks: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
      },
      isLoading: false,
      error: null,
      albums: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      albumsIsLoading: false,
      albumsError: null,
      artists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      artistsIsLoading: false,
      artistsError: null,
      playlists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      playlistsIsLoading: false,
      playlistsError: null,
      tracks: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      tracksIsLoading: false,
      tracksError: null,
    })

    mutations.REQUEST_SEARCH(state)
    expect(state).toEqual({
      query: 'abcde',
      result: {
        albums: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        artists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        playlists: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
        tracks: {
          next: 'xxxxx',
          offset: 0,
          limit: 10,
          items: [],
        },
      },
      isLoading: true,
      error: null,
      albums: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      albumsIsLoading: false,
      albumsError: null,
      artists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      artistsIsLoading: false,
      artistsError: null,
      playlists: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      playlistsIsLoading: false,
      playlistsError: null,
      tracks: {
        next: 'xxxxx',
        offset: 0,
        limit: 10,
        items: [],
      },
      tracksIsLoading: false,
      tracksError: null,
    })

    mutations.REQUEST_SEARCH_SUCCESS(state, searchResult)
    expect(state).toEqual({
      query: 'abcde',
      result: searchResult,
      isLoading: false,
      error: null,
      albums: albumsData,
      albumsIsLoading: false,
      albumsError: null,
      artists: artistsData,
      artistsIsLoading: false,
      artistsError: null,
      playlists: playlistsData,
      playlistsIsLoading: false,
      playlistsError: null,
      tracks: tracksData,
      tracksIsLoading: false,
      tracksError: null,
    })
  })
})
