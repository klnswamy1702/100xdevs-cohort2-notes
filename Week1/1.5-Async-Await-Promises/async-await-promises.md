# Async Function

Synchronus : one after other (only one thing at a time)
Asynchronus : happens in parts (multiple things are context switching with each other at a time)

eg)

1. setTimeout()
2. Read file
3. Sending a network req
4. A deliberate timeout
5. Fetch - to fetch some data from an API endpoint

In JS architecture, there are 3 areas : Call Stack, Web API, Callback Queue

1. Call Stack : where all the functions are executed
2. Web API : where all the async functions are executed
3. Callback Queue : where all the callbacks are executed

Once the async function is called, it is sent to the Web API and the call stack is free to execute other functions, after the async function is executed, it is sent to the callback queue, and the callback queue is free to execute other functions, and once the call stack is free, it will execute the callback queue ! This means dosent mattter the sync opeation, the async function will be executed once the thread is free !

## Promises

1. Promises are used to handle async operations in JS. They are easy to manage when dealing with multiple async operations where callbacks can create callback hell leading to unmanageable code.

2. Syntactical sugar over callbacks

3. Whenever you create promise class object, you need to pass a callback function with resolve and reject parameters. Resolve is called when the async operation is completed successfully and reject is called when the async operation is failed.

4. Promises are one time use, once the promise is resolved or rejected, it cannot be used again

## Async Await

1. It is just syntactic sugar. Still uses callbacks/Promises under the hood.
2. Makes code much more readable than callbacks/Promises.
3. Usually used on the caller side, not on the side where you define an async function
