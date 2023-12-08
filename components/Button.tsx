import { Pressable, View, Text } from 'react-native'
export default function Button({ onClick, text } : { onClick: () => any, text: string}) {
  return (
    <Pressable onPress={onClick}>
      <View style={{backgroundColor: 'blue', margin: 4, padding: 12, borderRadius: 10, }}>
        <Text style={{color: 'white'}}>{text}</Text>
      </View>
    </Pressable>
  )
}