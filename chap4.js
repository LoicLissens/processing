// 4.4 particle system
const particleSystem = new p5((p) => {
    const system = new ParticleSystem(300, 200)
    const gravity = new p5.Vector(0, 0.1)
    p.setup = () => {
        p.createCanvas(600, 400);
    }
    p.draw = () => {
        p.background(0);
        system.addForceToApply(gravity)
        system.addParticle()
        system.run(p)
    }
}, "particle-system")

// 4.5 System of system
const systemOfSystems = new p5((p) => {
    const systemsList = []
    p.setup = () => {
        p.createCanvas(600, 400);
    }
    p.draw = () => {
        p.background(0);
        for (let i = systemsList.length - 1; i > 0; i--) {
            const system = systemsList[i]
            if (system.lifeSpan < 0) {
                systemsList.splice(i, 1)
                continue
            }
            system.lifeSpan--
            system.system.addParticle()
            system.system.run(p)
        }
    }
    p.mousePressed = () => {
        const system = new ParticleSystem(p.mouseX, p.mouseY)
        systemsList.push({ lifeSpan: 255, system: system })
    }
}, "system-of-system")

// 4.X ? Particle system with repeller and wind
const PSWithRepeller = new p5((p) => {
    const system = new ParticleSystem(300, 100)
    const repeller = new Repeller(300, 300, 500, 30)
    const gravity = new p5.Vector(0, 0.1)
    p.setup = () => {
        p.createCanvas(600, 400);
    }
    p.draw = () => {
        const dx = p.map(p.mouseX, 0, p.width, -0.2, 0.2)
        const wind = new p5.Vector(dx, 0)
        p.background(0);
        repeller.display(p)
        system.addForceToApply(wind)
        system.addForceToApply(gravity)
        system.addObjectToInteract(repeller)
        system.addParticle()
        system.run(p)
    }
}, "ps-w-repeller")