import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
@Injectable()
export class AppCustomService{
  constructor(private http:HttpClient,private custom:CommonService){
    console.log('appcustom');
  }
}
