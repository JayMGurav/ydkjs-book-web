---
title: Memory, address and pointers
book: up & going
tags: [
    c++,
    programming concept,
]
---
Right now, at this very time while you are looking at this article zillions of instructions are being computed and executed by all the devices around us.Computation has become an integrated part of our life from our everyday coffee to the memories(photos) we capture, from the songs we love,hear and enjoy to the messages we send to our dear ones. We can hardly imagine what our days would be without all those mobiles and computers.These messages we send and the movies we watch to our everyday requirement of devices need lots of storage space and memory manuplation. 

Further more without wasting any of our time lets "address" the basics of the **Memory, address and pointers** from programming point of view. This is also a very important topic in c++ that should be well understood in order to program properly.


<!-- These computation process a lots of instructions and operate on much more data,usually for the reason to provide us with the ease of living. And so we can deliberately say that the major two aspects of computing are computation and data. These computation, data consumes a lot of memory 
And by the line **data is being computed** I mean thousands of instructions written in human-machine understandable form are executed  -->

**Note:** We will use c++ as our language of preference, despite our peference the basic idea remains through all the languages.

A computer's memory is a sequence of bytes, and these bytes are numbered to refer them and represent their location. We call such **number that indicates a location in the memory** an ***address***. In real these location are kind a character and integer values. For our convinence we will use the numbering from 0 to the last one as the location of these bytes stored in the memory.

The first byte has the address 0, the next the address 1 and so on. We can visualize a megabyte(MB) of memory as follows

<!-- XD image of an arrray from 0 to 2^20-1 -->

Everything we put into memory has an address to it for example we will declare a variable called age.

```cpp

int age = 20;

```

This will set aside a "int-sized" object, block or piece of memory of type `int` for `age` somewhere and put a value `20` into that memory. Similarly we can also store and manipulate the addresses. An object or the block that holds the address value is called the ***pointer***. For example the type needed to hold the address of an `int` is called ***int-pointer*** or ***pointer to int*** and is denoted by `int*`, the ***address-of*** operator(unary &) is used to get the address of an object.

```cpp

int* pointer_to_age = &age;

```
Assuming that of age is located at address 2799, The `pointer_to_age` will hold the value `2799` which is the address of the variable `age` with value `20`. The ***address-of*** operator is used as `&age` to get the address of the `age`. This can be represented as 

<!--XD image of the pointer with the value 2799 pointing to age with value 20  -->

Each type has an correspoinding pointer type 

```cpp

char ch = 'A';                                       // creates a block named ch and puts value 'A' into it
char* pointer_to_ch = &ch;                           // pointer_to_ch holds the address of ch

double temperature = 25.5;                           // creates a block named temperature and puts value 25.5 into it
double* pointer_to_temperature = &temperature;       // pointer_to_temperature holds the address of temperature

```

Now, if we want to see the value of the object pointed by the pointer we can use the ***content-of*** or the ***dereference operator***, a unary *

```cpp

std::cout << "age : " << temperature << age;
std::cout << "pointer_to_age : " << pointer_to_age << endl;
std::cout << "Contents of pointer_to_age : " << *pointer_to_age << endl;

// output
// age : 20
// pointer_to_age : 2799
// Contents of pointer_to_age : 20

```

The output of the `pointer_to_age` may vary depending on where the compiler allocated the memory for our variable `age`.
The ***deference operator*** can also be used on the left hand side of the assignment: