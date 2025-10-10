package Model;

import Model.Escuderia;
import Model.HistorialCarrera;
import Model.Temporada;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-10T07:46:46")
=======
@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-09T21:58:59")
>>>>>>> 9c08ae027554ed165e3ec85e117002d4969bfddf
@StaticMetamodel(Piloto.class)
public class Piloto_ { 

    public static volatile SingularAttribute<Piloto, String> codigo;
    public static volatile SingularAttribute<Piloto, String> podios;
    public static volatile SingularAttribute<Piloto, Integer> campeonatosGanados;
    public static volatile SingularAttribute<Piloto, Integer> posicionMasAlta;
    public static volatile SingularAttribute<Piloto, Date> fechaNacimiento;
    public static volatile SingularAttribute<Piloto, Integer> noPiloto;
    public static volatile SingularAttribute<Piloto, Double> puntos;
    public static volatile SingularAttribute<Piloto, String> nombre;
    public static volatile SingularAttribute<Piloto, Escuderia> escuderia;
    public static volatile SingularAttribute<Piloto, Temporada> temporada;
    public static volatile ListAttribute<Piloto, HistorialCarrera> historialCarreras;
    public static volatile SingularAttribute<Piloto, Integer> idPiloto;
    public static volatile SingularAttribute<Piloto, String> lugarNacimiento;

}