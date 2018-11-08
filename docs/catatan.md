# Catatan dokumentasi program

keterangan: 

| Teks        | Keterangan                         |
|-------------|------------------------------------|
| **bold**    | File atau modul                    |
| _italic_    | Istilah asing/ istilah programming |
| `monospace` | Petikan kode atau path             |



## Alur logika Program

### proses inisialisasi (_initialization_) 
1. mulai di **index.js**
2. masuk ke folder **startup** dan jalankan modul **routes.js**
a. atur view engine menjadi _Pug_
4. atur view di folder `./views`
5. gunakan `express.urlencoded()` agar bisa baca _application/x-www-form-urlencoded_
6. gunakan `express.json()` agar bisa menguraikan _JSON_
7. gunakan `express.static('public')` untuk menjalankan folder publik agar bisa menyediakan file statis(`static file`)
8. atur penggunaan rute agar _URL_ mengarah pada
   - `/api/users`
   - `/api/auth`
   - `/api/ships`
   - `(root)` untuk _views_

9. kembali ke  **index.js** masuk ke **startup** folder dan modul **db.js**
10. panggil configurasi `db` yang sudah ditetapkan sebelumnya menggunakan modul pihak ketiga`config` dengan `const db = config.get('db')`
11. setelah konfigurasi didapat, lakukan sambungan ke _MongoDB_ menggunakan konfigurasi sebelumnya sebagai argumen. perintahnya : `mongoose.connect(db,...).then(callback)`
12. kembali ke  **index.js**
13. atur _listen port_ pada port yang di inginkan. umumnya _Node.js_ menggunakan port `3000`

