package Model;

import Model.Piloto;
import Model.PosicionConstructor;
import Model.Temporada;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-10T07:46:46")
=======
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-09T21:58:59")
>>>>>>> 9c08ae027554ed165e3ec85e117002d4969bfddf
@StaticMetamodel(Escuderia.class)
public class Escuderia_ { 

    public static volatile ListAttribute<Escuderia, Piloto> pilotos;
    public static volatile ListAttribute<Escuderia, PosicionConstructor> posicionesConstructores;
    public static volatile SingularAttribute<Escuderia, String> chasis;
    public static volatile SingularAttribute<Escuderia, Temporada> temporada;
    public static volatile SingularAttribute<Escuderia, Integer> idEscuderia;
    public static volatile SingularAttribute<Escuderia, String> jefe_tecnico;
    public static volatile SingularAttribute<Escuderia, String> unidad_potencia;
    public static volatile SingularAttribute<Escuderia, String> jefe_equipo;
    public static volatile SingularAttribute<Escuderia, String> nombre;
    public static volatile SingularAttribute<Escuderia, String> base;

}