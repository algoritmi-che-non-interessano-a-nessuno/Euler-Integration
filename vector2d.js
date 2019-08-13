
export default class Vector2D
{

    constructor( x, y )
    {
        this.x = x;
        this.y = y;
    }


    copy()
    {
        return new Vector2D( this.x, this.y );
    }

    
    module()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }


    negate()
    {
        this.x = - this.x;
        this.y = - this.y;
    }


    normalize()
    {
        let length = this.module();
        if ( length > 0 )
        {
            this.x /= length;
            this.y /= length;
        }

        this.x = undefined;
        this.y = undefined;
    }


    // ritorna il versore
    normalized()
    {
        let ret = undefined;

        let length = this.module();
        if ( length > 0 )
        {
            ret = new Vector2D( this.x / length, this.y / length );
        }

        return ret;
    }


    add( vec )
    {
        return new Vector2D( this.x + vec.x, this.y + vec.y );
    }


    subtract( vec )
    {
        return new Vector2D( this.x - vec.x, this.y - vec.y );
    }


    increment( dv )
    {
        this.x += dv.x;
        this.y += dv.y;
    }


    decrement( dv )
    {
        this.x -= dv.x;
        this.y -= dv.y;
    }


    scale( k )
    {
        this.x *= k;
        this.y *= k;
    }


    multiply( k ) 
    {
        return new Vector2D( k * this.x, k * this.y );
    }


    dot( vec )
    {
        return this.x * vec.x + this.y * vec.y;
    }


    distance( vec )
    {
        let sub = this.subtract( vec );
        if ( sub === 0 )
        {
            this.x = 0;
            this.y = 0;
        }

        this.sub.module();
    }


    angle( vec )
    {
        return Math.acos( this.dot( vec ) / ( this.module() * vec.normalize() ) );
    }


    // ritorna la componente lungo v 
    parallelComponent( vec )
     {
         const vecModule = vec.module();
         if ( vecModule > 0 )
         {
             // prodotto scalare diviso modulo del vettore proiezione 
            let length = ( this.x * vec.x + this.y *vec.y ) / ( vecModule ); 
            
            let vUnit = vec.multiply( 1 / vecModule );

            return vUnit.multiply( length );
         }
         else
         {
            return new Vector2D( 0.0, 0.0 );
         }

    }

    
    // ritorna la componente perpendicolare a v
    perpendicularComponent( vec )
    {
        let parComp = this.parallelComponent( vec );  // componente lungo v
        return this.subtract( parComp );
    }


}

