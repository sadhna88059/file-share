#include<iostream>
using namespace std;

int main(){
int m[3]={1,2,3},
int n[3]={4,5,6},
int c[6];
   int i=0;
  int  j=0;
   int k=0;

   while(i<3 && j<3){
if(m[i]<n[i]){
    c[k++]=m[k++];}
    else{
 c[k++]=n[k++];}
    }
   
   for(;i<3;i++){
       c[k++]=m[i];}
   }
   for(;j<3;j++){
       c[k++]=m[j];}
   }

   cout<<c[6];
   
}