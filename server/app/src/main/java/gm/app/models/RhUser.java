package gm.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "rh_user")
public class RhUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer rrhh_user_id;
    String email;
    String password;
}

