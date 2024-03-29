import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atsiliepimai',
  templateUrl: './atsiliepimai.component.html',
  styleUrls: ['./atsiliepimai.component.css']
})
export class AtsiliepimaiComponent implements OnInit {

    atsiliepimai=[];
    isLoading=false;

  constructor( private http:HttpClient) { }

  ngOnInit(): void {
    this.getAtsiliepimai();
    
  }

  getAtsiliepimai(){
    this.isLoading=true;
    this.http
    .get('https://atsiliepimai-8658b-default-rtdb.europe-west1.firebasedatabase.app/atsiliepimai.json')
    .subscribe((response)=>{
        const tmp = [];
        for (const key in response){
            const temp2={
                ...response[key],
                id:key
            }
            tmp.push(temp2);
        }
        this.atsiliepimai=tmp;
        console.log(this.atsiliepimai);
        this.isLoading=false;
        
    })
    }

    deleteAtsiliepimai(){
        this.isLoading=true;
        this.http
        .delete('https://atsiliepimai-8658b-default-rtdb.europe-west1.firebasedatabase.app/atsiliepimai.json')
        .subscribe((response)=>{
            this.isLoading=false;
            this.atsiliepimai=[];
        })
    }
    deleteAtsiliepimas(id:string){
        this.isLoading=true;
        this.http
        .delete('https://atsiliepimai-8658b-default-rtdb.europe-west1.firebasedatabase.app/atsiliepimai/'+id+'.json')
        .subscribe((response)=>{
            this.getAtsiliepimai();
        })
    }
    onUpdate(){
        this.getAtsiliepimai();
    }
    anonymous(id:string){
        this.isLoading=true;
        this.http
        .patch('https://atsiliepimai-8658b-default-rtdb.europe-west1.firebasedatabase.app/atsiliepimai/'+id+'.json', {vardas:"Anonymous"})
        .subscribe((response)=>{
            this.getAtsiliepimai();            
        })
    }



}
