import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const images = [
  'https://e0.pxfuel.com/wallpapers/988/343/desktop-wallpaper-nature-beautiful-nature-thumbnail.jpg',
  'https://i.pinimg.com/originals/43/db/46/43db4682a57bbddf864719d9403919eb.jpg',
  'https://w0.peakpx.com/wallpaper/960/845/HD-wallpaper-nature-landscape-landscape-nature-thumbnail.jpg',
  'https://img.freepik.com/free-photo/view-nature-landscape-with-river_23-2150763810.jpg',
  'https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg',
  'https://i.pinimg.com/736x/d9/de/11/d9de112b2c4aedef6df31d05194adf21.jpg',
  'https://timesofindia.indiatimes.com/photo/82763468/82763468.jpg',
  'https://cdn.outsideonline.com/wp-content/uploads/2023/06/hiker-waterfall-nature_s.jpg',
  'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
  'https://cdn4.sharechat.com/img_904667_144d469b_1665585901876_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=876_sc.jpg',
];

const RenderImage = ({
  item,
  index,
  scrollX,
}: {
  item: string;
  index: number;
  scrollX: {value: number};
}) => {
  const startPostion = index * width;
  const endPostion = index * width + width;

  const imageStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollX.value,
        [startPostion, endPostion],
        [height, 100],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        scrollX.value,
        [startPostion, endPostion],
        [width, 80],
        Extrapolation.CLAMP,
      ),
      left: interpolate(scrollX.value, [startPostion, endPostion], [0, -20]),
    };
  });

  return (
    <Animated.Image
      style={[styles.image, {zIndex: -index}, imageStyle]}
      source={{uri: item}}
    />
  );
};

const Gallery = () => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderImage = (item: string, index: number) => {
    return (
      <RenderImage
        scrollX={scrollX}
        item={item}
        index={index}
        key={index.toString()}
      />
    );
  };
  return (
    <View style={styles.container}>
      {images.map(renderImage)}
      <Animated.ScrollView
        pagingEnabled
        onScroll={onScroll}
        contentContainerStyle={{width: images.length * width}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  image: {
    width,
    height,
    position: 'absolute',
    borderRadius: 10,
  },
});

export default Gallery;
