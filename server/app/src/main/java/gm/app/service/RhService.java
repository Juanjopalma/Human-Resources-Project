package gm.app.service;

import gm.app.models.RhUser;
import gm.app.repository.RhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RhService implements IRhUserService {

    @Autowired private RhRepository rhRepository;


    @Override
    public RhUser getUserByEmail(String email) {
        return rhRepository.findByEmail(email);
    }

    @Override
    public RhUser createRhUser(RhUser rhUser) {
        return rhRepository.save(rhUser);
    }
}

