import { Component ,ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat/'
import {AngularFirestoreCollection,AngularFirestore} from '@angular/fire/compat/firestore'
import { message } from "./messages.model";
import { Observable , map,of,catchError} from 'rxjs';
import { DocumentSnapshot } from '@angular/fire/compat/firestore/interfaces';
import { environment } from "./environment";
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'capstone-meet-app-app-chatroom',
  standalone: true,
  imports: [CommonModule,IonicModule, FormsModule],
  templateUrl: './app-chatroom.component.html',
  styleUrls: ['./app-chatroom.component.css'],
})
export class AppChatroomComponent {
  //scroll downwards
  @ViewChild('hiddenDiv') hiddenDiv!: ElementRef | undefined;
  //
  //chat variables
  eventChatCollection: AngularFirestoreCollection<message>;
  messages:message[]=[];
  messages2:message[]=[];
  ref='createdTime';
  //
  //messages: any[] = [];
  newMessage = '';
  selectedImage: File | null = null;
  selectedImageURL: string | null = null;
  selectedVideo: File | null = null;
  selectedVideoURL: string | null = null;

  constructor(private firestore: AngularFirestore,private storage:AngularFireStorage) {
    // Initialize the reference to the "eventChat" collection
    this.eventChatCollection = firestore.collection<message>('eventChat',(msg)=>msg.orderBy(this.ref));
    //this.loadMessages();
    this.getMessages('eventChatId-Test-app');
    //this.sendMessageFuncton('Engineering building','12345user','4gy4hiridgdfgurg43');
  }

  loadMessages() {
    if (this.eventChatCollection) {
      this.eventChatCollection.valueChanges().subscribe((messages: message[]) => {
        this.messages = messages;
        console.log(messages);
      });
    } else {
      console.log('Error with initialization');
    }
  }

  /*checkIfDocumentExists(collectionName: string, documentId: string): Observable<boolean> {
    const docRef = this.firestore.collection(collectionName).doc(documentId);

   return docRef.get().pipe(
        map((doc: any) => {
          return true;
        }),
      catchError((error:any) => {
        console.error('Error checking document:', error);
        return of(false); // Handle the error and return false if needed
      })
    );
  }*/


  getMessages(eventChatId: string) {
    return this.firestore
      .collection('eventChat')
      .doc(eventChatId)
      .collection('messages',(msg)=>msg.orderBy(this.ref)) // You can order messages by timestamp or any other field
      .valueChanges().subscribe((m: any) => {
        this.messages = m;
        console.log(m);
      });
  }

  sendMessageFuncton(text: string, senderUid: string,eventChatId:string) {
    const messageData = {
      message: text,
      userid: senderUid,
      eventid:eventChatId,
      createdTime: new Date()
    };
  
    // Add a new document to the "messages" collection
    this.firestore.collection('eventChat').doc(eventChatId)
    .collection('messages').add(messageData);
  }

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
      const messageData = {
        message: this.newMessage,
        userid: 'senderUid',
        eventid:'eventChatId-Test-app',
        createdTime: new Date()
      };
      
      this.firestore.collection('eventChat').doc('eventChatId-Test-app')
    .collection('messages').add(messageData);
       // Display the message immediately
     
      this.newMessage = ''; // Clear the input field
    }
    if (this.selectedImage) {
      const imageMessage = {
        imageUrl: this.selectedImageURL,
        userid:'senderid',
        eventid:'eventChatId-Test-app',
        createdTime: new Date(),
      };
      this.firestore.collection('eventChat').doc('eventChatId-Test-app')
    .collection('messages').add(imageMessage);

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
      //this.messages.push(videoMessage);

      // Reset the selected video and its preview
      this.selectedVideo = null;
      this.selectedVideoURL = null;
    }

    
  }


  uploadFile(file: File) {
    const storageRef = this.storage.ref('images/' + file.name);
    const uploadTask = storageRef.put(file);
  
    uploadTask.snapshotChanges().subscribe(() => {
      console.log('File uploaded');
    });
  }
  
  scrollToHiddenDiv() {
    const divElement = this.hiddenDiv?.nativeElement  as HTMLDivElement ;
    divElement.scrollIntoView({ behavior: 'smooth' });
  }
  
  
}
