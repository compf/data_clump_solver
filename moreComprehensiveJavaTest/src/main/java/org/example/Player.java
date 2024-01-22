package org.example;

public class Player {
    private int x,y,z;
    private String name;
    public void teleport(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public void walk(){
        x++;
        y++;
        z++;
    }
    public void walkBy(int dx, int dy, int dz){
        x += dx;
        y += dy;
        z += dz;
    }
    public Player(String name){
        this.name = name;
        this.x=0;
        this.y=0;
        this.z=0;
    }
    public Player(String name, int x, int y, int z){
        this.name = name;
        this.x=x;
        this.y=y;
        this.z=z;
    }
}
