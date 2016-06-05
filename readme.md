###1. Install phpunit ###

```composer install```

###2. Run the unit test for php code.###

``` vendor/bin/phpunit ```

###3. Install all the dependencies for node backend.###

```npm install```

###4. Running unit test for node backend###

```npm test```

###5. Generate ssl certificates.###

Currently webrtc only can run on https or localhost. To generate ssl public and private key you can check this articale [https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs,"ssl").

###6.Config port number###

port number configuration is inside port.json file.

``` 
{
  "port": 8080
}
```
php and node will read port value from this file.

