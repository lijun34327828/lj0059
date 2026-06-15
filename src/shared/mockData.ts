import type { BoardModule, BoardState } from './types'

export const defaultModules: BoardModule[] = [
  {
    id: 'text-1',
    type: 'text',
    x: 40,
    y: 30,
    width: 520,
    height: 160,
    content: {
      title: '蝴蝶的一生',
      body: '蝴蝶属于鳞翅目昆虫，经历卵、幼虫、蛹、成虫四个阶段，是完全变态发育的典型代表。从一颗微小的卵开始，经过毛毛虫阶段的不断进食成长，再到蛹期的神奇蜕变，最终羽化成美丽的蝴蝶。',
    },
  },
  {
    id: 'specimen-1',
    type: 'specimen',
    x: 40,
    y: 220,
    width: 240,
    height: 300,
    content: {
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=realistic%20monarch%20butterfly%20specimen%20on%20white%20background%20natural%20history%20museum&image_size=square',
      name: '金斑蝶',
      latinName: 'Danaus chrysippus',
      description: '翅展约 70mm，橙黄色翅膀配黑色边纹，是常见的迁徙性蝴蝶。',
    },
  },
  {
    id: 'specimen-2',
    type: 'specimen',
    x: 320,
    y: 220,
    width: 240,
    height: 300,
    content: {
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=realistic%20emerald%20beetle%20specimen%20on%20white%20background%20natural%20history%20museum&image_size=square',
      name: '翠绿金龟',
      latinName: 'Chrysochroa fulgidissima',
      description: '体长约 35mm，金属光泽的翠绿鞘翅，是东亚地区著名的观赏甲虫。',
    },
  },
  {
    id: 'schedule-1',
    type: 'schedule',
    x: 40,
    y: 550,
    width: 520,
    height: 280,
    content: {
      rows: [
        { time: '09:00', activity: '标本展示讲解', location: 'A 区展厅' },
        { time: '10:30', activity: '蝴蝶放飞体验', location: '生态花园' },
        { time: '14:00', activity: '昆虫绘画工坊', location: 'B 区教室' },
        { time: '15:30', activity: '夜间昆虫观察', location: '户外步道' },
      ],
    },
  },
]

export const defaultState: BoardState = {
  modules: defaultModules,
  themeId: 'spring',
  fontSize: 16,
  decorationOpacity: 0.3,
}
