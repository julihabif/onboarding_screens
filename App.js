import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions} from 'react-native';
import data from "./data/data";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useAnimatedRef,
    interpolate,
    Extrapolate,

} from "react-native-reanimated";
import {Pagination} from "./components/Pagination";
import CustomButton from "./components/CustomButton";

export default function App() {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const flatListRef = useAnimatedRef(null);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewItemsChanged = ({viewableItems}) => {
      flatListIndex.value = viewableItems[0].index;
  }

  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler((event) => {
      x.value = event.contentOffset.x;
  });

  const RenderItem = ({item,index}) =>{
      const imageAnimationStyle = useAnimatedStyle(() => {
          const opacityAnimation = interpolate(
              x.value,
              [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH],
              [0, 1, 0],
              Extrapolate.CLAMP,
          );
          const translateYAnimation = interpolate(
                x.value,
                [
                    (index - 1) * SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH],
                [100, 0, 100],
                Extrapolate.CLAMP,
            );
          return {
              opacity: opacityAnimation,
              width: SCREEN_WIDTH * 0.8,
              height:SCREEN_WIDTH * 0.8,
              transform: [{translateY: translateYAnimation}],

          };
      });
      const textAnimationStyle = useAnimatedStyle(() => {
          const opacityAnimation = interpolate(
              x.value,
              [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH],
              [0, 1, 0],
              Extrapolate.CLAMP,
          );
          const translateYAnimation = interpolate(
              x.value,
              [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH],
              [100, 0, 100],
              Extrapolate.CLAMP,
          );
          return {
              opacity: opacityAnimation,
              transform: [{translateY: translateYAnimation}],

          };
      });

      return (
      <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <Animated.Image source={item.image} style={imageAnimationStyle}/>
          <Animated.View style={textAnimationStyle}>
        <Animated.Text style={styles.itemTitle}>{item.title}</Animated.Text>
        <Animated.Text style={styles.itemText}>{item.text}</Animated.Text>
          </Animated.View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList ref={flatListRef} onScroll={scrollHandler} data={data} renderItem={({item,index}) =>{
        return <RenderItem item={item} index={index}/>
      }}
      keyExtractor={item => item.id}
      scrollEventThrottle={16}
      horizontal={true}
      bounces={false}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewItemsChanged}/>
        <View style={styles.bottomContainer}>
            <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH}/>
            <CustomButton flatListRef={flatListRef} flatListIndex={flatListIndex} dataLength={data.length} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9B0',
  },
  itemContainer:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#F8E9B0',

  },
  itemTitle:{
    color:'black',
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10,
  },
  itemText:{
    color:'black',
    textAlign:'center',
    lineHeight:20,
    marginHorizontal:35,
  },
    bottomContainer:{
      flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
        marginVertical:20,
        marginHorizontal:20,
    }
});
