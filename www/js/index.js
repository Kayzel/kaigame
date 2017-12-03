/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    
    funcBanner: function(){
            admob.setOptions({
                    publisherId: "ca-app-pub-2752832807213349/6238961797",
                    interstitialAdId: "ca-app-pub-2752832807213349/2584278507",
               // publisherId:          "ca-app-pub-2752832807213349~6238961797",  // Required
             //   interstitialAdId:     "ca-app-pub-2752832807213349/2584278507",  // Optional
            /*    tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
                tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
                tappxShare:           0.5       */                                 // Optional
                    bannerAtTop : true
            });
    },
    
    onDeviceReady: function() {
       
        app.funcBanner();
       // alert('первая ступень!');

        //alert('вторая ступень, найдены параметры рекламы');
        
        admob.createBannerView();
        app.receivedEvent();
            //    admob.requestInterstitialAd();
        
        
         
     //  alert('третья ступень, показ банера включен!'); 
    },
    
    receivedEvent: function(){
      var menue = document.getElementsByClassName('menuItem');
        for(var i = 0; i<menue.length; i++){
            menue[i].style.display = 'block';
        }
    }
    // Update DOM on a Received Event
};
