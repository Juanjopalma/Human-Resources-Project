package gm.app.repository;

import gm.app.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT user FROM User user WHERE user.is_deleted = false")
    List<User> findAllActiveUsers();

    @Modifying // indica que la consulta SQL ejecutada por este método modificará el estado de la bbdd
    @Transactional
    @Query("UPDATE User SET is_deleted = true WHERE user_id = :userId")
    void deactiveUserById(@Param("userId") Integer userId);
}
