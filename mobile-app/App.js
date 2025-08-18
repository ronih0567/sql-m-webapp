import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';

export default function App() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const login = async () => {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setToken(data.token);
  };

  const fetchItems = async () => {
    const res = await fetch('http://localhost:3001/api/items', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://localhost:3001/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchItems();
  };

  return (
    <View style={{ padding: 30 }}>
      <Text>Email:</Text>
      <TextInput onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password:</Text>
      <TextInput secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={login} />
      <View style={{ marginVertical: 20 }}>
        <Button title="Fetch Items" onPress={fetchItems} />
        <TextInput value={name} onChangeText={setName} placeholder="New Item" style={{ borderWidth: 1, marginVertical: 10 }} />
        <Button title="Add Item" onPress={addItem} />
        <FlatList data={items} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )} />
      </View>
    </View>
  );
}