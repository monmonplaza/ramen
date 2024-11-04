<?php
class Transaction
{
    public $transaction_aid;

    public $transaction_cart_item;
    public $transaction_subprice;
    public $transaction_price;
    public $transaction_payment;
    public $transaction_change;


    public $transaction_is_active;
    public $transaction_datetime;
    public $transaction_created;

    public $connection;
    public $lastInsertedId;

    public $tblTransaction;

    public $transaction_start;
    public $transaction_total;
    public $transaction_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTransaction = "ramen_transaction";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblTransaction} ";
            $sql .= "( transaction_cart_item, ";
            $sql .= "transaction_subprice, ";
            $sql .= "transaction_price, ";
            $sql .= "transaction_payment, ";
            $sql .= "transaction_change, ";
            $sql .= "transaction_is_active, ";
            $sql .= "transaction_datetime, ";
            $sql .= "transaction_created ) values ( ";
            $sql .= ":transaction_cart_item, ";
            $sql .= ":transaction_subprice, ";
            $sql .= ":transaction_price, ";
            $sql .= ":transaction_payment, ";
            $sql .= ":transaction_change, ";
            $sql .= ":transaction_is_active, ";
            $sql .= ":transaction_datetime, ";
            $sql .= ":transaction_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_cart_item" => $this->transaction_cart_item,
                "transaction_subprice" => $this->transaction_subprice,
                "transaction_price" => $this->transaction_price,
                "transaction_payment" => $this->transaction_payment,
                "transaction_change" => $this->transaction_change,
                "transaction_is_active" => $this->transaction_is_active,
                "transaction_datetime" => $this->transaction_datetime,
                "transaction_created" => $this->transaction_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblTransaction} ";
            $sql .= "order by transaction_is_active desc, ";
            $sql .= "transaction_datetime asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAllByDate()
    {
        try {
            $sql = "select *, sum(transaction_price) as total from {$this->tblTransaction} ";
            $sql .= "group by date(transaction_created) ";
            $sql .= "order by transaction_is_active desc, ";
            $sql .= "transaction_created asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblTransaction} ";
            $sql .= "order by transaction_is_active desc, ";
            $sql .= "transaction_datetime asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->transaction_start - 1,
                "total" => $this->transaction_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblTransaction} ";
            $sql .= "where transaction_cart_item like :transaction_cart_item ";
            $sql .= "order by transaction_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_cart_item" => "%{$this->transaction_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblTransaction} ";
            $sql .= "where transaction_aid  = :transaction_aid ";
            $sql .= "order by transaction_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_aid" => $this->transaction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblTransaction} set ";
            $sql .= "transaction_cart_item = :transaction_cart_item, ";
            $sql .= "transaction_price = :transaction_price, ";
            $sql .= "transaction_price = :transaction_price, ";
            $sql .= "transaction_payment = :transaction_payment, ";
            $sql .= "transaction_change = :transaction_change, ";
            $sql .= "transaction_datetime = :transaction_datetime ";
            $sql .= "where transaction_aid = :transaction_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_cart_item" => $this->transaction_cart_item,
                "transaction_price" => $this->transaction_price,
                "transaction_price" => $this->transaction_price,
                "transaction_payment" => $this->transaction_payment,
                "transaction_change" => $this->transaction_change,
                "transaction_datetime" => $this->transaction_datetime,
                "transaction_aid" => $this->transaction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblTransaction} set ";
            $sql .= "transaction_is_active = :transaction_is_active, ";
            $sql .= "transaction_datetime = :transaction_datetime ";
            $sql .= "where transaction_aid = :transaction_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_is_active" => $this->transaction_is_active,
                "transaction_datetime" => $this->transaction_datetime,
                "transaction_aid" => $this->transaction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblTransaction} ";
            $sql .= "where transaction_aid = :transaction_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_aid" => $this->transaction_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select transaction_cart_item from {$this->tblTransaction} ";
            $sql .= "where transaction_cart_item = :transaction_cart_item ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_cart_item" => "{$this->transaction_cart_item}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    // public function checkAssociation()
    // {
    //     try {
    //         $sql = "select product_transaction_id from {$this->tblTransaction} ";
    //         $sql .= "where product_transaction_id = :product_transaction_id ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "product_transaction_id" => $this->transaction_aid,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblTransaction} ";
            $sql .= "where transaction_is_active = :transaction_is_active  ";
            $sql .= "order by transaction_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_is_active" => $this->transaction_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblTransaction} ";
            $sql .= "where ";
            $sql .= "transaction_is_active = :transaction_is_active ";
            $sql .= "and transaction_cart_item like :transaction_cart_item ";
            $sql .= "order by transaction_is_active desc, ";
            $sql .= "transaction_cart_item asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_cart_item" => "%{$this->transaction_search}%",
                "transaction_is_active" => $this->transaction_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
