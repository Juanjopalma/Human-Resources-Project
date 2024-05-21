package gm.app.service;

import gm.app.models.RhUser;

import java.util.List;

public interface IRhUserService {

    public RhUser getUserByEmail(String email);

    public RhUser createRhUser(RhUser rhuser);
}
