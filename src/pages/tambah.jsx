import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddDataForm() {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState('');
  const [jabatan, setJabatan] = useState('');

  const addUser = async (e) => {
    e.preventDefault();

    const add = {
      nama: nama,
      nik: nik,
      gender: gender,
      jabatan: jabatan,
    };
    
    try {
      await axios.post('http://localhost:3000/users', add);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil ditambahkan',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate('/guru');
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Terjadi Kesalahan!',
        text: 'Mohon coba lagi',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" component="div" align="center" style={{ marginBottom: '16px' }}>
        Tambah Data Guru
      </Typography>
      <form onSubmit={addUser}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="nama"
              label="Nama Guru"
              variant="outlined"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="nik"
              label="NIK"
              variant="outlined"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="gender"
              label="Gender"
              variant="outlined"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="jabatan"
              label="Jabatan"
              variant="outlined"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Tambah
        </Button>
      </form>
    </Paper>
  );
}

export default AddDataForm;
