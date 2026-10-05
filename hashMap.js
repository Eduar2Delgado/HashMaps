export default class HashMap
{
    constructor()
    {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) 
    {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        
        if (hashCode < 0 || hashCode >= this.capacity) {
        throw new Error("Trying to access index out of bounds");
        }

            return hashCode;
    } 

    set(key, value)
    {
        const index = this.hash(key);

        if(this.buckets[index] !== undefined)
        {
            const bucket = this.buckets[index];
            for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return; 
            }
            }
            bucket.push([key, value]); 
        }
        else
        {
            this.buckets[index] = [[key, value]];
        }

        console.log(this.buckets);
    }

    get(key)
    {
      const index = this.hash(key);
      const bucket = this.buckets[index];  
  
      if(bucket === undefined)
          return undefined;
      
        for (let i = 0; i < bucket.length; i++)
        {
            if (bucket[i][0] === key) {
                return bucket[i][1]; 
                }
        }
        return undefined;
    }
    
    has(key)
    {        
        return this.get(key) !== undefined;     
    }

    remove(key)
    {
        const index = this.hash(key);
        const bucket = this.buckets[index];  
    
        if(bucket === undefined)
        {
            return false;
        }
        
            for (let i = 0; i < bucket.length; i++)
            {
                    if (bucket[i][0] === key) {
                        bucket.splice(i,1);
                        return true; 
                        }
            return false;
            }
    }

    length()
    {
        let total = 0;
        for(let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i] !== undefined) {
                total += this.buckets[i].length;
                }
        }
        return total;
    }

    clear()
    {
        this.buckets = new Array(this.capacity);
    }

    keys()
    {
        const keys = [];
            for(let i = 0; i < this.buckets.length; i++){
                const bucket = this.buckets[i];
                if (this.buckets[i] !== undefined) {
                    for (let j = 0; j < bucket.length; j++) {
                    keys.push(bucket[j][0]); 
                }
                }
            }
            return keys;
    }

    values()
    {
        const values = [];
            for(let i = 0; i < this.buckets.length; i++){
                const bucket = this.buckets[i];
                if (this.buckets[i] !== undefined) {
            for (let j = 0; j < bucket.length; j++) {
                values.push(bucket[j][1]); 
            }
                }
            }
            return values;
    }

    entries()
    {
        const entries = [];
        for(let i = 0; i < this.buckets.length; i++){
            const bucket = this.buckets[i];
                if (this.buckets[i] !== undefined) {
        for (let j = 0; j < bucket.length; j++) {
            entries.push(bucket[j]); 
        }
                }
        }
            return entries;
    }
  
}

