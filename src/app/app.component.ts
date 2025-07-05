import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngDeploy';
  getStr:String='';
constructor(private st:TestService){
this.getD();
}

getD():void{

  this.st.get().subscribe(data=>{
    this.getStr=data;
    console.log(this.getStr);
  });


}


}
