<?php
/**
* all the php helper here
**/

if (!function_exists("baseUrl")) {
	function baseUrl($path,$port=null){
       if($port == null){
       	 return BASE_URL."/".$path;
       }else{
       	 return BASE_URL.":$port/".$path;
       }
        
	}
}

