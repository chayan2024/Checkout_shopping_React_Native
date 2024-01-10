import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [productCart, setProductCart] = useState([
    { id: 1, name: 'Product A', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product B', price: 29.99, quantity: 1 },
    { id: 3, name: 'Product C', price: 9.99, quantity: 3 },
  ]);

  const calculateTotal = (product) => {
    return product.price * product.quantity;
  };

  const flatListData = productCart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    total: calculateTotal(item),
  }));

  const getTotalItemCount = () => {
    return productCart.reduce((total, item) => total + item.quantity, 0);
  };

  const addItem = (productId) => {
    setProductCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeItem = (productId) => {
    setProductCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Total: ${item.total.toFixed(2)}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity onPress={() => addItem(item.id)}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerText}>{getTotalItemCount()}</Text>
        </View>
      </View>

      <FlatList
        data={flatListData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.checkoutButton} >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'blue',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    marginLeft: 8,
    color: 'white',
  },
  productItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    padding: 10
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft:16,
    marginRight:16,
    marginBottom:16
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default App;
