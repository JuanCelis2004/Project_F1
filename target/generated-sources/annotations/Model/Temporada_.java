package Model;

import Model.Carrera;
import Model.Escuderia;
import Model.Piloto;
import Model.PosicionConstructor;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-10T07:46:46")
=======
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-09T21:58:59")
>>>>>>> 9c08ae027554ed165e3ec85e117002d4969bfddf
@StaticMetamodel(Temporada.class)
public class Temporada_ { 

    public static volatile ListAttribute<Temporada, Piloto> pilotos;
    public static volatile ListAttribute<Temporada, Carrera> carreras;
    public static volatile ListAttribute<Temporada, PosicionConstructor> posicionesConstructores;
    public static volatile ListAttribute<Temporada, Escuderia> escuderias;
    public static volatile SingularAttribute<Temporada, Integer> idTemporada;
    public static volatile SingularAttribute<Temporada, Integer> anio;

}