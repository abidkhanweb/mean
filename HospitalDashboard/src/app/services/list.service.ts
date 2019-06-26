import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs/observable';
import { List } from '../models/Lists';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

lists:any;
  private serverApi= 'http://localhost:3000';

  public getAllLists():Observable<List[]> {

    let URI = `${this.serverApi}/bucketlist/`;
    return this.http.get(URI)
        .map((res:Response) => res.json())
        .map(res => <List[]>res.lists);
}


  public addList(list: List) {
        let URI = `${this.serverApi}/bucketlist/`;
        let headers = new HttpHeaders;
         let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
         console.log(body);
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body ,{headers: headers})
        .map((res:Response) => res.json());
    }

    


  public deleteList(listId : string) {
    let URI = `${this.serverApi}/bucketlist/${listId}`;
      let headers = new HttpHeaders;
      headers.append('Content-Type', 'application/json');
      return this.http.delete(URI, {headers})
      .map((res:Response) => res);
  }
}
