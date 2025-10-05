package Model;

import Model.Escuderia;
import Model.Temporada;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-05T17:50:57")
@StaticMetamodel(PosicionConstructor.class)
public class PosicionConstructor_ { 

    public static volatile SingularAttribute<PosicionConstructor, Integer> posicion;
    public static volatile SingularAttribute<PosicionConstructor, Integer> idPosicion;
    public static volatile SingularAttribute<PosicionConstructor, Temporada> temporada;
    public static volatile SingularAttribute<PosicionConstructor, Integer> victorias;
    public static volatile SingularAttribute<PosicionConstructor, Escuderia> constructor;
    public static volatile SingularAttribute<PosicionConstructor, Double> puntos;

}