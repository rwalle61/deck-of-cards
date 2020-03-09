import posed from 'react-pose';

const AnimatedCardDiv = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

export { AnimatedCardDiv };
