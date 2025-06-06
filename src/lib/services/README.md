давай подумаем над архитектурой, которую я создал, нужна надежность и тестируемость и легкость использования

у меня есть Сервис

он должен (для чего?)

1. подключиться к stream UA (\*)
   => UA onConnected

2. когда UA onConnected
   подключиться к stream T (\*\*)
   => T onConnected

3. UA onConnected + T onConnected
   CabalService Ready (\*\*\*)

он может работать при условии

который имеет методы

CabalService
start 1.

(\*) подключение к stream UA

connect to UA
listen UA
ping UA
pong UA
connected UA
error UA

ping -> (время ожидания) -> pong
-> первый успешный pong
-> остальные успешные pong
-> ошибка

(\*\*) подключение к stream T

connect to T
listen T
ping T
pong T
connected T
error T

0. start CB service
1. create stream (UA)
   onConnected (2.)
   onMessage (5.)
   onError (4.)

2. create stream (T)
   onConnected (3.)
   onMessage (6.)
   onError (4.)

3. onReady := True

4. onReady := False
   UA := null
   T := null
