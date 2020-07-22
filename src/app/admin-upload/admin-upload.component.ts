import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.css'],
})
export class AdminUploadComponent implements OnInit {
  selectedImg: File;
  imgPreview:String;
  adminProduct:Array<any>=[];
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  getFile(event:any) {
    console.log(event.target.files[0]);
    this.selectedImg = <File>event.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
        this.imgPreview=reader.result as String;
    };
    reader.readAsDataURL(this.selectedImg)
  }
  upload() {
    const formData=new FormData();
    formData.append("adminID","5")
    formData.append("pcategory","5")
    formData.append("ptitle","5")
    formData.append("poffer","5")
    formData.append("pdescription","5")
    formData.append("pimg",this.selectedImg)
    formData.append("pdate","5")
    formData.append("pcompany","5")
    this.auth.adminUploadProduct(formData).subscribe((data)=>{
      console.log(data);
      this.adminProduct=data
    })
  }
}
