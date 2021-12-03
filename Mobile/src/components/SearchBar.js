import * as React from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'


const SearchBar = () => {


  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = query => setSearchQuery(query)

  return (

    <Searchbar style={styles.search}
      placeholder="Pesquisar um Orçamento"
      placeholderTextColor="#000"
      iconColor="#000"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

  )

}



const styles = StyleSheet.create({

    search: {
      backgroundColor: "#F2F3F9",
      color: "#000",
      borderRadius: 0,
      shadowColor: "#F2F3F9",
      fontFamily: '',
      marginLeft: 9,
    }

  }

)

export default SearchBar