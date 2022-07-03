// More explanation can be found in this article: https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/

interface Flavoring<FlavorT> {
  _type?: FlavorT;
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;
