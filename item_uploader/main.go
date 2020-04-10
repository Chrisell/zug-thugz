package main

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/dynamodb"
    "github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"

    "encoding/json"
    "fmt"
    "io/ioutil"
    "os"
)
type Item struct {
    Name       string `json:"name"`
    Boss       string `json:"boss"`
    ArmorType  string `json:"armor_type"`
    Slot       string `json:"slot"`
    Location   string `json:"location"`
    Category   string `json:"category"`
    Ilvl       float64 `json:"ilvl"`
}
func getItems() []Item {
    raw, err := ioutil.ReadFile("./aq40.json")
    if err != nil {
        fmt.Println(err.Error())
        os.Exit(1)
    }

    var items []Item
    json.Unmarshal(raw, &items)
    return items
}

func main() {
    sess := session.Must(session.NewSessionWithOptions(session.Options{
        SharedConfigState: session.SharedConfigEnable,
    }))

    svc := dynamodb.New(sess)
    items := getItems()

    tableName := "ZugThugzItems"

    for _, item := range items {
        av, err := dynamodbattribute.MarshalMap(item)
        if err != nil {
            fmt.Println("Got error marshalling map:")
            fmt.Println(err.Error())
            os.Exit(1)
        }

        input := &dynamodb.PutItemInput{
            Item:      av,
            TableName: aws.String(tableName),
        }

        _, err = svc.PutItem(input)
        if err != nil {
            fmt.Println("Got error calling PutItem:")
            fmt.Println(err.Error())
            os.Exit(1)
        }


        fmt.Println("Successfully added " + item.Name + " to table " + tableName)
    }
}