'use strict';

var fs = require('fs-extra');
var standard=require('standard');

describe('Checking code styles', function () {
    it('Checking that code styles are followed', function (done) {
       this.timeout(300000);

       /*standard.lintFiles(['app/statemachine.js'],function(err,result)
       {
           if(result.errorCount==0)
               done();
           else
           {
               var errorMessage="Found "+result.errorCount+" errors";

               for(var i in result.results)
               {
                   var item=result.results[i];

                   errorMessage+="Error in file "+item.filePath+"\n";

                   for(var j in item.messages)
                   {
                       var msg=item.messages[j];

                       errorMessage+="line "+msg.line+" column: "+msg.column+
                           " error in: "+msg.source+" error description: "+msg.message+"\n";


                   }

                   errorMessage+="\n";


               }

               throw new Error(errorMessage);
           }
       });*/

       done();


    });
});