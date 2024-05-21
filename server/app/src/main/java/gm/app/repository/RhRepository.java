package gm.app.repository;


import gm.app.models.RhUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RhRepository extends JpaRepository<RhUser, Integer> {
    RhUser findByEmail(String email);
}

