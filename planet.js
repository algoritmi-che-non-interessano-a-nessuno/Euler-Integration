import Vector2D from "./vector2d.js";

const G = 1;                    // costante gravitazionale


export default class Planet
{

    constructor( mass, 
                 center,
                 radius,
                 color )
    {
        this.mass = mass;
        this.p = center;                        // posizione
        this.v = new Vector2D( 0, 0 );          // velocità
        this.radius = radius;
        this.color = color;

        this.historyIsActive = false;
        this.history = [];
        this.history.push( this.p.copy() );
    }


    move( actractorPlanet, dt )
    {
        this.eulerIntegration( actractorPlanet, dt );

        // memorizza la storia
        if ( this.historyIsActive ) { this.history.push( this.p.copy() ) }
    }


    eulerIntegration( actractorPlanet, dt )
    {
        // forza
        const f = gravityForce( this.p, this.mass, actractorPlanet );

        // accelerazione
        const a = f.multiply( 1 / this.mass );

        // aggiorna velocità
        const dv = a.multiply( dt );
        this.v = this.v.add( dv );
        
        // aggiorna posizione
        const dp = this.v.multiply( dt );
        this.p = this.p.add( dp ); 
    }


    draw( ctx )
    {
        //ctx.fillStyle = this.color;
        let grad = ctx.createRadialGradient( this.p.x, this.p.y, 0, this.p.x, this.p.y, this.radius );
        grad.addColorStop( 0, '#ffffff' );    
        grad.addColorStop( 1, this.color );
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.arc( this.p.x, this.p.y, this.radius, 0, 2 * Math.PI, true );
        ctx.closePath();
        ctx.fill();

        // disegna la storia
        if ( this.historyIsActive )
        {
            ctx.strokeStyle  = "white";
            ctx.beginPath();                    // clear path
            ctx.moveTo( this.history[ 0 ].x, this.history[ 0 ].y );
            for ( let i = 1; i < this.history.length; i++ )
            {
                ctx.lineTo( this.history[ i ].x, this.history[ i ].y );
            }     
            ctx.stroke();
            }
        }

}


function gravityForce( planetPos, planetMass, actractorPlanet )
{
    const r = actractorPlanet.p.subtract( planetPos );
    const rModule = r.module();
   
    return r.normalized().multiply( G * actractorPlanet.mass * planetMass / ( rModule * rModule ) );
}