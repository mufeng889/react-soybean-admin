import type { Plugin } from 'vite';
import gradientString from 'gradient-string';
import boxen, { type Options as BoxenOptions } from 'boxen';

const welcomeMessage = gradientString('#646cff', 'magenta').multiline(
  `您好! 欢迎使用 react-soybean 开源项目\n我们为您精心准备了精美的保姆级文档\nhttps://react-soybean-docs.pages.dev/index-cn?theme=dark`
);

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: '#646cff',
  borderStyle: 'round'
};

export function setupProjectInfo(): Plugin {
  return {
    name: 'vite:buildInfo',

    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
    }
  };
}
