// Home.js
import React from 'react';

function Home() {
  const centerTextStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Untuk membuat teks berada di tengah vertikal layar
    textAlign: 'center', // Untuk mengatur teks menjadi tengah secara horizontal
  };

  return (
    <div style={centerTextStyle}>
      <h1>Selamat Datang di Website Kami</h1>
      <p>"Menyediakan Sumber Pengetahuan Terbaik"</p>
    </div>
  );
}

export default Home;
