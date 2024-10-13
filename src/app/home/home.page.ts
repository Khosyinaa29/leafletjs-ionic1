import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public basemapOptions: { name: string, url: string, attribution: string }[] = [
    { name: 'Topographic', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: 'Map data: &copy; OpenTopoMap' },
    { name: 'Satellite', url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors' },
    { name: 'Streets', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors' },
    { name: 'Dark Gray', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; CARTO' },
    { name: 'Hybrid', url: 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', attribution: '&copy; Thunderforest' }
  ];

  public selectedBasemap = this.basemapOptions[2]; // Default basemap ()

  map!: L.Map;
  currentLayer!: L.TileLayer;
  marker!: L.Marker;

  constructor() { }
  ngOnInit() {
    //   this.map = L.map('mapId').setView([35, 76943, -580081])
    //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(this.map)
  }

  ionViewDidEnter() {
    // dipanggil setiap aplikasi di run
    this.map = L.map('mapId').setView([-7.7727787971482005, 110.36795842573426], 10)

    // Inisialisasi layer pertama
    this.currentLayer = L.tileLayer(this.selectedBasemap.url, {
      attribution: this.selectedBasemap.attribution
    }).addTo(this.map);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);
    const customIcon = L.icon({
      iconUrl: 'assets/icon/location1.gif', // Path to your custom marker image
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point where the icon is anchored (center bottom)
      popupAnchor: [0, -32], // Where the popup opens relative to the icon
    });

     // Add a marker with the custom icon
    const marker = L.marker([-7.7727787971482005, 110.36795842573426], { icon: customIcon }).addTo(this.map);

    // Menambahkan popup pada marker
    marker.bindPopup(this.createPopupContent()).openPopup();

    // Event ketika popup terbuka
    this.map.on('popupopen', () => this.onPopupOpen());
  }

  // Method untuk membuat konten popup
  createPopupContent() {
    return `
      <div style="text-align: center;">
        <b>Hai gusyy!!!</b><br>
        I am here, where r u??<br>
        <img id="popupImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg/800px-Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg" alt="My Image" width="150px" /><br>
        <div style="margin: 10px 0;">
          <div style="display: inline-block; border: 2px solid #dc3545; border-radius: 5px; padding: 5px; cursor: pointer; margin-left: 5px;" id="deleteBtn">
            <i class="fas fa-trash"></i> Delete
          </div>
        </div>
        <br>
        <input type="file" id="fileInput" style="display:none;" accept="image/*">
      </div>
    `;
  }

  // Event handler ketika popup terbuka
  onPopupOpen() {
    const deleteBtn = document.getElementById('deleteBtn');
    const imgElement = document.getElementById('popupImage') as HTMLImageElement;

    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.deleteImage(imgElement));
    }
  }

  // Fungsi untuk menghapus gambar di popup
  deleteImage(imgElement: HTMLImageElement) {
    if (imgElement) {
      imgElement.src = ''; // Mengosongkan sumber gambar untuk menghapusnya dari tampilan
    }
  }

  // Method untuk mengubah basemap
  changeBasemap() {
    // Menghapus basemap terpilih
    this.map.removeLayer(this.currentLayer);

    // Menambahkan basemap baru
    this.currentLayer = L.tileLayer(this.selectedBasemap.url, {
      attribution: this.selectedBasemap.attribution
    }).addTo(this.map);
  }
}
