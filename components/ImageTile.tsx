import { View, Text, Image } from "react-native";

export default function ImageTile({ index, item, ownershipCount } : { index: number, item: { id: number, url: number, img: any, title: string, }, ownershipCount: bigint | undefined}) {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        marginBottom: 15,
        overflow: 'hidden',
      },]}
    >
      <Image
        source={item.img}
        resizeMode="cover"
        style={{ 
          width: 100, 
          height: 100,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      />
      <Text style={{
        marginTop: 8,
        fontSize: 12,
        fontWeight: '700',
      }}>
        {item.title}
      </Text>
      <Text style={{
        marginTop: 4,
        fontSize: 10,
        fontWeight: '400',
      }}>
        You own {ownershipCount?.toString() ?? 11} tokens
      </Text>
    </View>
  );
}
