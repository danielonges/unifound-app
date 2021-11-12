/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

/**
 *
 * @author jiajun
 */
@Entity
public class Announcement implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /*
    @Column(nullable = false)
    @NotNull
    private String announcementTitle;
    */
    
    @Column(nullable = false)
    @NotNull
    private String announcementBody;
    
    private int likesCount;
    
    private List<UserEntity> usersLiked;
    
    /*
    @Enumerated(EnumType.STRING)
    private AnnouncementEnum announcementStatus;

    private boolean announcementPin;//pinned to the top of the board, can be OPTIONAL feature
    
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;
    */
    
    public Announcement() {
    }

    public Announcement(String announcementBody) {
        this.announcementBody = announcementBody;
        this.likesCount = 0;
        this.usersLiked = new ArrayList<>();
    }
    /*
    public boolean isAnnouncementPin() {
        return announcementPin;
    }

    public void setAnnouncementPin(boolean announcementPin) {
        this.announcementPin = announcementPin;
    }

    public String getAnnouncementTitle() {
        return announcementTitle;
    }

    public void setAnnouncementTitle(String announcementTitle) {
        this.announcementTitle = announcementTitle;
    }
    */

    public String getAnnouncementBody() {
        return announcementBody;
    }

    public void setAnnouncementBody(String announcementBody) {
        this.announcementBody = announcementBody;
    }

    /*
    public AnnouncementEnum getAnnouncementStatus() {
        return announcementStatus;
    }

    public void setAnnouncementStatus(AnnouncementEnum announcementStatus) {
        this.announcementStatus = announcementStatus;
    }
    */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   

    @Override
    public String toString() {
        return "entity.Announcement[ id=" + id + " ]";
    }
    /*
    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
    */

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public List<UserEntity> getUsersLiked() {
        return usersLiked;
    }

    public void setUsersLiked(List<UserEntity> usersLiked) {
        this.usersLiked = usersLiked;
    }
}
