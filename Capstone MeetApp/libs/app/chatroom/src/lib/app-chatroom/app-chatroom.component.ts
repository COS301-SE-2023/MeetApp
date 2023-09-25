import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule } from '@ionic/angular';


@Component({
  selector: 'capstone-meet-app-app-chatroom',
  standalone: true,
  imports: [CommonModule,IonicModule, FormsModule],
  templateUrl: './app-chatroom.component.html',
  styleUrls: ['./app-chatroom.component.css'],
})
export class AppChatroomComponent {
  messages: any[] = [];
  newMessage = '';

  selectedImage: File | null = null;

  selectedImageURL: string | null = null;
  selectedVideo: File | null = null;
  selectedVideoURL: string | null = null;

  openVideoPicker() {
    const videoInput = document.getElementById('videoInput');
    if (videoInput) {
      videoInput.click(); // Programmatically trigger the file input
    }
  }

  handleVideoUpload(event: any) {
    this.selectedVideo = event.target.files[0];
    if (this.selectedVideo) {
      // Display a preview of the selected video (if needed)
      this.selectedVideoURL = URL.createObjectURL(this.selectedVideo);
    }
  }

  openImagePicker() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.click(); // Programmatically trigger the file input
    }
  }

  handleImageUpload(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageURL = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  sendMessage() {
    // Send the new message to the server
    if (this.newMessage.trim() !== '') {
      const message = {
        user: 'You', // Replace with the actual sender's name
        text: this.newMessage,
        timestamp: new Date(),
      };
      this.messages.push(message); // Display the message immediately
     
      this.newMessage = ''; // Clear the input field
    }
    if (this.selectedImage) {
      const imageMessage = {
        user: 'You',
        imageUrl: this.selectedImageURL,
        timestamp: new Date(),
      };
      this.messages.push(imageMessage);

      // Reset the selected image and its preview
      this.selectedImage = null;
      this.selectedImageURL = null;
    }

    if (this.selectedVideo) {
      // Assuming you have uploaded the video to a server and have its URL
      const videoMessage = {
        user: 'You',
        videoUrl: this.selectedVideoURL, 
        timestamp: new Date(),
      };
      this.messages.push(videoMessage);

      // Reset the selected video and its preview
      this.selectedVideo = null;
      this.selectedVideoURL = null;
    }
  }
  
}
