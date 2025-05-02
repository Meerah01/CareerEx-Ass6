
const express = require("express")
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 7000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

const drugs = [

    { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
   
    { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
   
    { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
   
    { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
   
    { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
   
    { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
   
    { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
   
    { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
   
    { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
   
    { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
   
    { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
   
    { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
   
    { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
   
    { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
   
    { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
   
    { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
   
    { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
   
    { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
   
    { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
   
    { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
   
   ]


//    QUESTION 1
   app.get("/antibiotic", (req, res)=>{
    const antibioticDrugs = drugs.filter( (each) => {
        return each.category === "Antibiotic"})

        res.json(antibioticDrugs)
   })


// QUESTION 2
   app.get("/drugName", (req, res)=>{
    const drugNames = drugs.map( (each) => {
        return each.name.toLocaleLowerCase()
})
        res.json(drugNames)
   })


// QUESTION 3
   app.post("/category", (req, res) => {
    const {category} = req.body
        if (!category) {
            res.json( 'Category is required' )
        }

    const categoryNames = (drugs.filter(drug => drug.category === category))   
        if (categoryNames.length === 0) {
            res.json('No items found for this category')
        }

    res.json(categoryNames)
   })



// QUESTION 4
    app.get("/drugManufacturer", (req,res)=>{
        const drugDetail = drugs.map( (drug) => {
            return { drugName: drug.name,
             drugManufacturer: drug.manufacturer
     }
})
            res.json(drugDetail)
    })


// QUESTION 5
    app.get("/drugPrescription", (req, res)=>{
        const drugPrescription = drugs.filter( (each) => {
            return each.isPrescriptionOnly === true
    })
            res.json(drugPrescription)
    })


// QUESTION 6
    app.get("/drugFormat", (req,res)=>{
        const drugFormat = drugs.map( (drug) => {
            return `Drug: ${drug.name} - ${drug.dosageMg}mg.`
    })
            res.json(drugFormat)
    })


// QUESTION 7
    app.get("/drug/low-stock", (req, res)=>{
        const drugStock = drugs.filter( (each) => {
            return  each.stock < 50 
    }).map( (each) => {
            return each.name
    })
            res.json(drugStock)
    })


// QUESTION 8
    app.get("/drugs/non-prescription", (req, res) => {
        const drugPrescription2 = drugs.filter( (each) => {
            return each.isPrescriptionOnly != true
    })
            res.json( drugPrescription2 )
    })


    // QUESTION 9
    app.post("/drugs/manufacturer-count", (req, res) => {
        const {manufacturer} = req.body
            if(!manufacturer){
                res.json("Manufacturer's name is required!")
            }
        const drugsByManufacturer = drugs.filter(drug => drug.manufacturer === manufacturer).length

        res.json(drugsByManufacturer)
    })


// QUESTION 10
    app.get("/drugs/count-analgesics", (req, res) =>{
        let analgesicDrugs = 0 
            drugs.forEach( (drug) => {
                if (drug.category === "Analgesic") 
                    { analgesicDrugs++ }
})
            res.json(analgesicDrugs)
    })

  