import { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState('');
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <h1>Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <hr />
      <h1>Items</h1>
      <button onClick={fetchItems}>Load Items</button>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  );
}